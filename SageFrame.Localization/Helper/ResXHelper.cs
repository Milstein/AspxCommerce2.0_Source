﻿#region "Copyright"
/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2012 by SageFrame
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#endregion

#region "References"
using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;
using System.Globalization;
using System.Resources;
using System.Diagnostics;
using System.IO;
using System.Collections;
#endregion

namespace SageFrame.Localization
{
    [Serializable]
    public class ResXHelper
    {
        protected string baseFileName;
        protected string basePath;
        protected object lck = new object();
        public ResXHelper(string filePath)
		{
			List<string> siblings = FindResXSiblings(filePath);
			foreach(string sibling in siblings)
				Languages.Add(FindCultureInFilename(sibling), ReadResX(sibling));
			baseFileName = GetBaseName(filePath);
			basePath = Path.GetDirectoryName(filePath);
		}
        public static SortedList<string, string> GetResXInDirectory(string basePath, string display)
        {
            DirectoryInfo dir = new DirectoryInfo(basePath);
            FileInfo[] files = dir.GetFiles("*.resx", SearchOption.AllDirectories);

            SortedList<string, string> dict = new SortedList<string, string>();
            string baseNameFallback="";
            foreach (FileInfo file in files)
            {
                string baseName = ResXHelper.GetBaseName(file.FullName);
                string path = Path.GetDirectoryName(file.FullName);
                baseNameFallback=baseName;              
               
                if (file.FullName.Contains("."+display+"."))
                    dict.Add(baseName, file.FullName);
            }
            if (dict.Count < 1)
            {
                //if no resource files are found load the fall back resource
                dict.Add(baseNameFallback,basePath+"Default.aspx");
            }
            return dict;
        }
        public static string GetBaseName(string filePath)
        {
            if (Path.GetExtension(filePath).ToLower().EndsWith("resx"))
            {
                string file = Path.GetFileName(filePath);
                string[] split = file.Split('.');
                // assumption: filenames don't have . in them except if IsAspNetFile... 
                if (IsAspNetFile(file))
                    return split[0] + "." + split[1];
                else
                    return split[0];
            }
            else
                return filePath;
        }
        public static string FindCultureInFilename(string filename)
        {
            string file = filename.Substring(filename.IndexOf(GetBaseName(filename)) + GetBaseName(filename).Length + 1); // remove base name plus the dot. 
            string[] split = file.Split('.');
            if (split.Length == 2)
                return split[0];
            else if (split.Length > 2)
                throw new Exception("Invalid base resx name. Filenames other than aspx/ascx/ashx/asmx/master are assumed not to contain any periods.");
            else
                return "Default";
        }
        private static bool IsAspNetFile(string file)
        {
            return file.ToLower().Contains(".ascx.") || file.ToLower().Contains(".aspx.") || file.ToLower().Contains(".master.") || file.ToLower().Contains(".asmx.") || file.ToLower().Contains(".ashx.");
        }
        public static void WriteResX(string fileName, List<ResourceDefinition> lstResDef)
        {
            try
            {
                using (ResXResourceWriter writer = new ResXResourceWriter(fileName))
                {
                    foreach (ResourceDefinition obj in lstResDef)
                        writer.AddResource(obj.Key, obj.Value);
                    writer.Generate();
                }
            }
            catch { throw new Exception("Error while saving " + fileName); }
        }
        public delegate R GenericPredicate<T, R>(params T[] obj);
        public static Dictionary<string, string> ReadResX(string filename)
        {
            Dictionary<string, string> extracted = new Dictionary<string, string>();
            try
            {
                using (ResXResourceReader reader = new ResXResourceReader(filename))
                {
                    foreach (DictionaryEntry entry in reader)
                        extracted.Add((string)entry.Key, (string)entry.Value);
                }
            }
            catch (Exception ex) { Debug.WriteLine("Problem loading ResX: " + filename + "." + ex.Message); }

            return extracted;
        }
        protected List<string> FindResXSiblings(string filePath)
        {
            string basePath = Path.GetDirectoryName(filePath);
            string baseFileName = GetBaseName(filePath);

            DirectoryInfo dir = new DirectoryInfo(basePath);
            FileInfo[] files = dir.GetFiles("*.resx", SearchOption.TopDirectoryOnly);

            List<string> siblings = new List<string>();

            foreach (FileInfo file in files)
            {
                if (file.Name.StartsWith(baseFileName))
                    siblings.Add(file.FullName);
            }

            return siblings;
        }       
        public DataTable ToDataTable(bool removeEmpty)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Key");

            lock (lck)
            {
                foreach (string lang in Languages.Keys)
                    table.Columns.Add(lang);

                foreach (string key in UnifiedKeys)
                {
                    bool isEmpty = false;
                    if (removeEmpty)
                        isEmpty = IsKeyEmpty(key);

                    if (!isEmpty)
                    {
                        DataRow row = table.NewRow();
                        table.Rows.Add(row);
                        row["Key"] = key;

                        foreach (string lang in Languages.Keys)
                            row[lang] = lang;
                    }
                }
            }

            return table;
        }
        protected bool IsKeyEmpty(string key)
        {
            bool isEmpty = true;
            foreach (string lang in Languages.Keys)
            {
                if (!string.IsNullOrEmpty(lang))
                {
                    isEmpty = false;
                    break;
                }
            }
            return isEmpty;
        }
        public DataTable ToDataTable()
        {
            return ToDataTable(false);
        }
        #region Properties

        protected Dictionary<string, Dictionary<string, string>> Languages = new Dictionary<string, Dictionary<string, string>>();

        protected List<string> unifiedKkeys = new List<string>();

        public List<string> UnifiedKeys
        {
            get
            {
                foreach (string lang in Languages.Keys)
                {
                    foreach (string key in Languages[lang].Keys)
                    {
                        if (!unifiedKkeys.Contains(key))
                            unifiedKkeys.Add(key);
                    }
                }

                return unifiedKkeys;
            }
        }

        #endregion

    }
}
