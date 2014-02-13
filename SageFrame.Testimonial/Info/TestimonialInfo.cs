using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SageFrame.Testimonial.Info
{
    public class TestimonialInfo
    {
        public int TestimonialID { get; set; }
        public string UserName { get; set; }        
        public string Title { get; set; }
        public string Testimonial { get; set; }
        public string Image { get; set; }
        public string Address { get; set; }
        public string WebUrl { get; set; }
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string AddedOn { get; set; }
        public DateTime DeletedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string AddedBy  { get; set; }
        public string DeletedBy { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public DateTime TestimonialDate { get; set; }
        public string ShortDescription { get; set; }

       // public Testimonial(){}

    }
}
