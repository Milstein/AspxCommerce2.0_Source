/*
AspxCommerce® - http://www.aspxcommerce.com
Copyright (c) 20011-2012 by AspxCommerce
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

namespace AspxCommerce.Core
{
    public class ShoppingOptionsInfo
    {
         #region "Private Members"
        int _lowerOption;
        int _upperOption;
        int _count;
        string _itemIDs;
        #endregion

        #region "Constructors"
        public ShoppingOptionsInfo()
        {
        }

        public ShoppingOptionsInfo(int lowerOption,int upperOption, int count, string itemIds)
        {
            this.LowerOption = lowerOption;
            this.UpperOption = upperOption;
            this.Count = count;
            this.ItemIDs = itemIds;
        }
        #endregion

        #region "Public Properties"
        public int LowerOption
        {
            get { return _lowerOption; }
            set { _lowerOption = value; }
        }

        public int UpperOption
        {
            get { return _upperOption; }
            set { _upperOption = value; }
        }


        public int Count
        {
            get { return _count; }
            set { _count = value; }
        }
        public string ItemIDs
        {
            get { return _itemIDs; }
            set { _itemIDs = value; }
        }
        #endregion
    }
}
