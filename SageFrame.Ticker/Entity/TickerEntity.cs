using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SageFrame.Ticker.Info
{
    public class TickerInfo
    {
        #region "Private Members"
        int _tickerID;
        string _tickerNews;
        bool _isVisible;
        DateTime _startDate;
        DateTime _endDate;
        int _storeID;
        int _portalID;
        bool _isActive;
        bool _isDeleted;
        bool _isModified;
        DateTime _addedOn;
        DateTime _updatedOn;
        DateTime _deletedOn;
        string _addedBy;
        string _updatedBy;
        string _deletedBy;
        #endregion

        #region "Constructors"
        public TickerInfo()
        {
        }

        public TickerInfo(int tickerID, string tickerNews, bool isVisible, DateTime startDate, DateTime endDate, int storeID, int portalID, bool isActive, bool isDeleted, bool isModified, DateTime addedOn, DateTime updatedOn, DateTime deletedOn, string addedBy, string updatedBy, string deletedBy)
        {
            this.TickerID = tickerID;
            this.TickerNews = tickerNews;
            this.IsVisible = isVisible;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.StoreID = storeID;
            this.PortalID = portalID;
            this.IsActive = isActive;
            this.IsDeleted = isDeleted;
            this.IsModified = isModified;
            this.AddedOn = addedOn;
            this.UpdatedOn = updatedOn;
            this.DeletedOn = deletedOn;
            this.AddedBy = addedBy;
            this.UpdatedBy = updatedBy;
            this.DeletedBy = deletedBy;
        }
        #endregion

        #region "Public Properties"
        public int TickerID
        {
            get { return _tickerID; }
            set { _tickerID = value; }
        }

        public string TickerNews
        {
            get { return _tickerNews; }
            set { _tickerNews = value; }
        }

        public bool IsVisible
        {
            get { return _isVisible; }
            set { _isVisible = value; }
        }

        public DateTime StartDate
        {
            get { return _startDate; }
            set { _startDate = value; }
        }

        public DateTime EndDate
        {
            get { return _endDate; }
            set { _endDate = value; }
        }

        public int StoreID
        {
            get { return _storeID; }
            set { _storeID = value; }
        }

        public int PortalID
        {
            get { return _portalID; }
            set { _portalID = value; }
        }

        public bool IsActive
        {
            get { return _isActive; }
            set { _isActive = value; }
        }

        public bool IsDeleted
        {
            get { return _isDeleted; }
            set { _isDeleted = value; }
        }

        public bool IsModified
        {
            get { return _isModified; }
            set { _isModified = value; }
        }

        public DateTime AddedOn
        {
            get { return _addedOn; }
            set { _addedOn = value; }
        }

        public DateTime UpdatedOn
        {
            get { return _updatedOn; }
            set { _updatedOn = value; }
        }

        public DateTime DeletedOn
        {
            get { return _deletedOn; }
            set { _deletedOn = value; }
        }

        public string AddedBy
        {
            get { return _addedBy; }
            set { _addedBy = value; }
        }

        public string UpdatedBy
        {
            get { return _updatedBy; }
            set { _updatedBy = value; }
        }

        public string DeletedBy
        {
            get { return _deletedBy; }
            set { _deletedBy = value; }
        }
        #endregion
    }
}
