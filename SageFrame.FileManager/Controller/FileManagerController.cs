#region "Copyright"
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
using System.Collections.Generic;
using System.Linq;
using System.Text;
#endregion

namespace SageFrame.FileManager
{
    public class FileManagerController
    {
        public static void AddFolder(Folder folder)
        {
            try
            {
                FileMangerDataProvider.AddFolder(folder);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static void AddRootFolder(Folder folder)
        {
            try
            {
                FileMangerDataProvider.AddRootFolder(folder);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static int AddFolderReturnFolderID(Folder folder)
        {
            try
            {
                return (FileMangerDataProvider.AddFolderReturnFolderID(folder));
            }
            catch (Exception)
            {

                throw;

            }

        }
        public static void EnableRootFolder(int FolderID, bool IsEnabled)
        {
            try
            {
                FileMangerDataProvider.EnableRootFolder(FolderID, IsEnabled);
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static List<Folder> GetFolders()
        {

            return (FileMangerDataProvider.GetFolders());

        }
        public static void AddFile(ATTFile file)
        {
            try
            {
                FileMangerDataProvider.AddFile(file);
            }
            catch (Exception)
            {
                throw;

            }
        }
        public static List<ATTFile> GetFiles(int FolderID)
        {
            try
            {
                return (FileMangerDataProvider.GetFiles(FolderID));
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static List<ATTFile> SearchFiles(string SearchQuery)
        {
            try
            {
                return (FileMangerDataProvider.SearchFiles(SearchQuery));
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static void DeleteFileFolder(int FolderID, int FileID)
        {
            try
            {
                FileMangerDataProvider.DeleteFileFolder(FolderID, FileID);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static void DeleteRootFolder(int FolderID)
        {
            try
            {
                FileMangerDataProvider.DeleteRootFolder(FolderID);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static void UpdateFile(int FileID, string fileName)
        {
            try
            {
                FileMangerDataProvider.UpdateFile(FileID, fileName);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static void CopyFile(int FileID, int FolderID, string Folder, Guid UniqueID, Guid VersionGuid)
        {
            try
            {
                FileMangerDataProvider.CopyFile(FileID, FolderID, Folder, UniqueID, VersionGuid);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static void MoveFile(int FileID, int FolderID, string Folder, Guid UniqueID, Guid VersionGuid)
        {
            try
            {
                FileMangerDataProvider.MoveFile(FileID, FolderID, Folder, UniqueID, VersionGuid);
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static void SetFolderPermission(int FolderID, string PermissionKey, int UserID, Guid RoleID, int IsActive, string AddedBy)
        {
            try
            {
                FileMangerDataProvider.SetFolderPermission(FolderID, PermissionKey, UserID, RoleID, IsActive, AddedBy);
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static void DeleteExistingPermissions(int FolderID)
        {
            try
            {
                FileMangerDataProvider.DeleteExistingPermissions(FolderID);
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static List<FolderPermission> GetFolderPermissions(int FolderID)
        {
            try
            {
                return (FileMangerDataProvider.GetFolderPermissions(FolderID));
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static int GetUserID(string userName)
        {
            try
            {
                return (FileMangerDataProvider.GetUserID(userName));
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static List<FolderPermission> GetUserListForFolder(int FolderID)
        {
            try
            {
                return (FileMangerDataProvider.GetUserListForFolder(FolderID));
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static List<string> GetPermissionKeys(int FolderID, int UserID, int UserModuleID, string UserName)
        {
            try
            {
                return (FileMangerDataProvider.GetPermissionKeys(FolderID, UserID, UserModuleID, UserName));
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static ATTFile GetFileDetails(int FileID)
        {
            try
            {
                return (FileMangerDataProvider.GetFileDetails(FileID));
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static List<Folder> GetRootFolders()
        {
            try
            {
                return (FileMangerDataProvider.GetRootFolders());
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static List<Folder> GetActiveRootFolders()
        {
            try
            {
                return (FileMangerDataProvider.GetActiveRootFolders());
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static List<Folder> GetAllFolders()
        {
            try
            {
                return (FileMangerDataProvider.GetAllFolders());
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static List<string> GetModulePermission(int UserModuleID, string UserName)
        {
            try
            {
                return (FileMangerDataProvider.GetModulePermission(UserModuleID, UserName));
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static List<FileManagerSettingInfo> GetFileManagerSettings(int UserModuleID, int PortalID)
        {
            try
            {
                return (FileMangerDataProvider.GetFileManagerSettings(UserModuleID, PortalID));
            }
            catch (Exception)
            {

                throw;

            }
        }
        public static void AddUpdateSettings(List<FileManagerSettingInfo> lstSettings)
        {

            try
            {
                FileMangerDataProvider.AddUpdateSettings(lstSettings);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
