using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AspxCommerce.Core
{
    public class ServiceManageInfo
    {
        public int RowTotal { get; set; }
        public int ServiceID { get; set; }
        public string ItemName { get; set; }
        public int ItemID { get; set; }
        public DateTime ServiceDateFrom { get; set; }
        public DateTime ServiceDateTo { get; set; }
        public string ServiceTimeFrom { get; set; }
        public string ServiceTimeTo { get; set; }
        public decimal Price { get; set; }
    }

    public class ServiceListInfo
    {
        public int RowTotal { get; set; }
        public int ServiceID { get; set; }
        public string ServiceName { get; set; }
        public string StoreBranchName { get; set; }
    }
    public class ServiceGridListInfo
    {
        public int RowTotal { get; set; }
        public int ServiceID { get; set; }
        public string ServiceName { get; set; }
        public string StoreBranchName { get; set; }
        public int StoreBranchID { get; set; }
    }

    public class ServiceEmpInfo
    {
        public int RowTotal { get; set; }
        public int ServiceID { get; set; }
        public int ServiceEmployeeID { get; set;}
        public string ServiceEmployeeName { get; set; }
        public int EmployeeID { get; set; }
    }
    public class BookingDetailsInfo
    {
        public int RowTotal { get; set; }
        public int AppointmentID { get; set; }
        public string AppointmentStatusAliasName { get; set; }
        public string CustomerName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string PreferredDate { get; set; }
        public string PreferredTime { get; set; }
        public string ItemName { get; set; }
    }
}
