﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace NextBusNL
{
    public partial class NextBusDialog : Form
    {
        public NextBusDialog()
        {
            InitializeComponent();
            this.VisibleChanged += OnVisibleChanged;
        }

        private void OnVisibleChanged(object sender, EventArgs eventArgs)
        {
            if (Visible == true)
            {
                this.bussesLabel.Text = OVApi.getNextBus();
            }
        }
    }
}
