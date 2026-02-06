// ============================================
// NAVIGATION
// ============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('mobile-active');
  const icon = mobileToggle.querySelector('i');
  if (navMenu.classList.contains('mobile-active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      
      // Close mobile menu if open
      navMenu.classList.remove('mobile-active');
      const icon = mobileToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// DARK MODE TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Update icon
  if (body.classList.contains('dark-mode')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
});

// ============================================
// TYPING EFFECT
// ============================================

const typedTextElement = document.getElementById('typedText');
const roles = [
  'Business Analyst',
  'Data Storyteller',
  'Problem Solver',
  'Strategic Thinker'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 150;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const suffix = element.getAttribute('data-suffix') || '';
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

// Intersection Observer for counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValue = entry.target;
      const target = parseInt(statValue.getAttribute('data-target'));
      if (target) {
        animateCounter(statValue, target);
      }
      statsObserver.unobserve(statValue);
    }
  });
}, { threshold: 0.5 });

// Observe all stat values with data-target attribute
document.querySelectorAll('.stat-value[data-target]').forEach(stat => {
  statsObserver.observe(stat);
});

// ============================================
// SKILLS PROGRESS BARS
// ============================================

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const progress = progressBar.getAttribute('data-progress');
      progressBar.style.width = progress + '%';
      skillsObserver.unobserve(progressBar);
    }
  });
}, { threshold: 0.5 });

// Observe all progress bars
document.querySelectorAll('.progress-bar-fill').forEach(bar => {
  skillsObserver.observe(bar);
});

// ============================================
// SKILLS FILTER
// ============================================

const categoryBtns = document.querySelectorAll('.category-btn');
const skillCards = document.querySelectorAll('.skill-card');

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const category = btn.getAttribute('data-category');
    
    skillCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        // Reset and re-animate progress bar
        const progressBar = card.querySelector('.progress-bar-fill');
        if (progressBar) {
          progressBar.style.width = '0';
          setTimeout(() => {
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
          }, 100);
        }
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================
// PROJECTS FILTER
// ============================================

const filterBtns = document.querySelectorAll('.projects-filters .filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category');
      
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================
// PROJECT MODAL
// ============================================

const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');

// Project data for modals
const projectData = {
    fraud: {
      title: 'Fraud Detection Analytics Dashboard',
      subtitle: 'Identifying financial fraud patterns through advanced analytics',
      content: `
        <h2>Fraud Detection Analytics Dashboard</h2>
        <p class="project-subtitle">Identifying financial fraud patterns through advanced analytics</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">Python</span>
          <span class="project-tag">Tableau</span>
          <span class="project-tag">Machine Learning</span>
          <span class="project-tag">Financial Analytics</span>
        </div>
        
        <div class="project-stats" style="margin-bottom: 2rem;">
          <div class="project-stat">
            <div class="project-stat-value">500+</div>
            <div class="project-stat-label">Transactions Analyzed</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">87%</div>
            <div class="project-stat-label">Fraud Detection Accuracy</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">3</div>
            <div class="project-stat-label">High-Risk Patterns</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">8</div>
            <div class="project-stat-label">Dashboard Views</div>
          </div>
        </div>
        
        <h3>Overview</h3>
        <p>Built an interactive fraud detection system analyzing 500+ bank transactions to identify vulnerabilities in ATM usage patterns, high-risk demographics, and transaction behaviors. Combined exploratory data analysis with machine learning to deliver actionable security recommendations.</p>
        
        <h3>Dashboard Visualizations & Insights</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>1. Fraud Distribution by Account Type (Donut Chart)</h4>
          <p><strong>Visualization:</strong> Circular chart showing distribution of 519 fraudulent transactions across account types</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Business accounts: 37.19% of fraud cases (highest risk)</li>
            <li>Checking accounts: 34.49%</li>
            <li>Savings accounts: 28.32% (lowest risk)</li>
          </ul>
          <p><strong>Business Value:</strong> Launch targeted campaigns to increase Savings account usage, reducing risk concentration in Business/Checking accounts</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>2. Temporal Fraud Trends (Hourly Bar Chart)</h4>
          <p><strong>Visualization:</strong> 24-hour bar chart showing fraud frequency by hour of day</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Peak fraud hour: 10 AM with 33 cases</li>
            <li>Secondary peaks: 3 AM, 5 AM, and 1 PM</li>
            <li>Lower activity during afternoon/evening hours</li>
          </ul>
          <p><strong>Business Value:</strong> Deploy real-time monitoring resources during high-risk windows (3-11 AM)</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>3. Geographic Fraud Hotspots (India Heatmap)</h4>
          <p><strong>Visualization:</strong> Choropleth map showing fraud concentration across Indian states</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Central India (Maharashtra, West Bengal, Jharkhand) shows highest fraud</li>
            <li>Northern states have lower fraud rates</li>
            <li>Geographic clustering suggests regional fraud networks</li>
          </ul>
          <p><strong>Business Value:</strong> Direct fraud prevention resources to high-risk regions for maximum impact</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>4. Fraud Risk by Age & Gender (Heatmap)</h4>
          <p><strong>Visualization:</strong> Grid showing fraud counts at intersection of age groups and gender</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Young females (<25) most vulnerable: 7,015 fraud cases</li>
            <li>Risk equalizes for 25-55 age groups across genders</li>
            <li>Males 25-35: 5,112 cases vs females: 4,593 cases</li>
          </ul>
          <p><strong>Business Value:</strong> Enable targeted education campaigns for young female customers with tailored alerts</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>5. Transaction Type vs Merchant Category (Treemap)</h4>
          <p><strong>Visualization:</strong> Nested rectangles showing fraud distribution across categories</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Withdrawal + Clothing shows largest fraud block</li>
            <li>Debit transactions in Health, Groceries, Clothing show high fraud</li>
            <li>Electronics transactions relatively secure</li>
          </ul>
          <p><strong>Business Value:</strong> Implement merchant-category-specific security protocols and stricter verification</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>6. Fraud Vulnerability by Device (Lollipop Chart)</h4>
          <p><strong>Visualization:</strong> Horizontal lollipop chart ranking devices by fraud count</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>ATM Booth Kiosks: 65 cases (highest)</li>
            <li>ATMs: 52 cases</li>
            <li>Self-service Banking: 50 cases</li>
            <li>Desktop/Laptop: 21 cases (safest)</li>
          </ul>
          <p><strong>Business Value:</strong> Prioritize physical security upgrades at self-service locations with highest vulnerability</p>
        </div>
        
        <h3>Business Impact</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Identified $47K in potentially fraudulent transactions
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Reduced false positive rate by 23% vs. rule-based system
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Enabled proactive fraud prevention in peak hours (3-11 AM)
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Framework for real-time fraud scoring across 8 risk dimensions
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          <span class="skill-tag">Python</span>
          <span class="skill-tag">Pandas</span>
          <span class="skill-tag">NumPy</span>
          <span class="skill-tag">Scikit-learn</span>
          <span class="skill-tag">Matplotlib</span>
          <span class="skill-tag">Seaborn</span>
          <span class="skill-tag">Tableau</span>
          <span class="skill-tag">Statistical Analysis</span>
        </div>
      `
    },
    walmart: {
      title: 'Walmart Financial Reporting Modernization',
      subtitle: 'Enterprise system consolidating 50+ reports',
      content: `
        <h2>Walmart Financial Reporting Modernization</h2>
        <p class="project-subtitle">Enterprise system consolidating 50+ reports</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">SQL</span>
          <span class="project-tag">Snowflake</span>
          <span class="project-tag">BigQuery</span>
          <span class="project-tag">Power BI</span>
          <span class="project-tag">Enterprise</span>
        </div>
        
        <div class="project-stats" style="margin-bottom: 2rem;">
          <div class="project-stat">
            <div class="project-stat-value">50+</div>
            <div class="project-stat-label">Reports Consolidated</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">20%</div>
            <div class="project-stat-label">Cost Reduction</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">1000+</div>
            <div class="project-stat-label">End Users</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">99%</div>
            <div class="project-stat-label">Data Accuracy</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">30%</div>
            <div class="project-stat-label">Faster Decisions</div>
          </div>
        </div>
        
        <h3>Overview</h3>
        <p>Led the modernization of Walmart's financial reporting infrastructure, consolidating fragmented AP/AR and tax reports into a centralized, cloud-based system. Delivered significant cost savings while improving compliance accuracy and enabling data-driven decision-making.</p>
        
        <h3>The Business Challenge</h3>
        <p>Walmart's CILL (Corporate, International, and Legal Ledger) team managed 50+ disconnected financial reports across multiple systems. This created:</p>
        <ul>
          <li>Data inconsistencies across departments</li>
          <li>Manual reconciliation requiring 40+ hours weekly</li>
          <li>Delayed financial insights (7-10 day lag)</li>
          <li>Compliance risks from fragmented tax reporting</li>
          <li>High infrastructure costs from legacy systems</li>
          <li>Limited self-service analytics for leadership</li>
        </ul>
        
        <h3>My Role</h3>
        <p><strong>Lead Business Analyst</strong> for requirements gathering, system design, data migration strategy, and stakeholder management for this enterprise transformation project.</p>
        
        <h3>Project Phases</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 1: Discovery & Analysis (6 weeks)</h4>
          <ul>
            <li>Conducted 30+ stakeholder interviews across Finance, Tax, Legal, IT</li>
            <li>Documented current state: mapped 50+ existing reports to source systems</li>
            <li>Created AS-IS process flows for 8 key reporting workflows</li>
            <li>Performed gap analysis identifying consolidation opportunities</li>
            <li>Designed TO-BE state with centralized data warehouse architecture</li>
          </ul>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 2: Technical Implementation (12 weeks)</h4>
          <ul>
            <li>Created source-to-target mapping for 200+ data elements</li>
            <li>Built complex SQL queries consolidating AP/AR and tax reports</li>
            <li>Migrated data from Oracle/SAP to Snowflake/BigQuery</li>
            <li>Implemented data validation rules achieving 99% accuracy</li>
            <li>Optimized queries reducing runtime from 45 minutes to 3 minutes</li>
          </ul>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 3: Business Intelligence Layer</h4>
          <p>Created 5 executive PowerBI dashboards:</p>
          <ul>
            <li><strong>Financial Overview Dashboard:</strong> Revenue, expenses, cash flow, variance analysis</li>
            <li><strong>AP/AR Aging Dashboard:</strong> Automated aging buckets with trend analysis</li>
            <li><strong>Tax Compliance Dashboard:</strong> Real-time tax liability tracking</li>
            <li><strong>Budget vs. Actuals:</strong> Variance analysis with predictive forecasting</li>
            <li><strong>Product Performance Metrics:</strong> KPI tracking for CILL initiatives</li>
          </ul>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 4: Change Management</h4>
          <ul>
            <li>Led weekly steering committee meetings with VP-level executives</li>
            <li>Delivered 15+ training sessions reaching 1000+ end users</li>
            <li>Coordinated UAT with 30+ business users</li>
            <li>Achieved 95% defect resolution pre-launch</li>
          </ul>
        </div>
        
        <h3>Results & Business Impact</h3>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem;">
          <h4 style="color: var(--accent-green);"><i class="fas fa-dollar-sign"></i> Cost Savings</h4>
          <p><strong>20% reduction in reporting infrastructure costs ($400K annually)</strong></p>
          <ul style="margin-bottom: 0;">
            <li>Eliminated redundant systems and licenses</li>
            <li>Reduced data storage costs through cloud optimization</li>
            <li>Automated manual processes saving 160 hours/month</li>
          </ul>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem;">
          <h4 style="color: var(--accent-green);"><i class="fas fa-clock"></i> Efficiency Gains</h4>
          <p><strong>30% faster decision cycles for leadership</strong></p>
          <ul style="margin-bottom: 0;">
            <li>Real-time dashboards vs. 7-10 day lag</li>
            <li>Self-service analytics reducing IT bottleneck</li>
            <li>Automated monthly close process (3 days faster)</li>
          </ul>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem;">
          <h4 style="color: var(--accent-green);"><i class="fas fa-check-circle"></i> Data Quality</h4>
          <p><strong>99% accuracy in financial data (up from 92%)</strong></p>
          <ul style="margin-bottom: 0;">
            <li>Automated validation rules catching errors proactively</li>
            <li>Single source of truth eliminating reconciliation issues</li>
            <li>Improved audit trail for compliance</li>
          </ul>
        </div>
        
        <h3>Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          <span class="skill-tag">SQL</span>
          <span class="skill-tag">Snowflake</span>
          <span class="skill-tag">BigQuery</span>
          <span class="skill-tag">Power BI</span>
          <span class="skill-tag">Jira</span>
          <span class="skill-tag">Confluence</span>
          <span class="skill-tag">Excel</span>
          <span class="skill-tag">Data Modeling</span>
        </div>
      `
    },
    franklin: {
      title: 'Amazon Purchase Order Forecasting System',
      subtitle: 'Predictive framework for Franklin Sports\' INFLATED Division',
      content: `
        <h2>Forecasting Amazon Purchase Order Behavior</h2>
        <p class="project-subtitle">A Predictive Framework for Franklin Sports' INFLATED Division</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">Python</span>
          <span class="project-tag">JavaScript</span>
          <span class="project-tag">Inventory Optimization</span>
          <span class="project-tag">Predictive Analytics</span>
          <span class="project-tag">Supply Chain</span>
        </div>
        
        <div class="project-stats" style="margin-bottom: 2rem;">
          <div class="project-stat">
            <div class="project-stat-value">197</div>
            <div class="project-stat-label">ASINs Analyzed</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">$6M+</div>
            <div class="project-stat-label">Inventory Value</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">12</div>
            <div class="project-stat-label">Week Forecast</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">76</div>
            <div class="project-stat-label">Stockouts Prevented</div>
          </div>
        </div>
        
        <h3>Executive Summary</h3>
        <p>Developed a data-driven methodology to forecast Amazon's potential purchase order behavior for Franklin Sports' INFLATED product division over a 12-week planning horizon. The analysis focused on modeling when and how much Amazon's replenishment systems might order based on inventory positions, lead time constraints, and anticipated consumer demand.</p>
        
        <h3>The Business Challenge</h3>
        <p>Operating as an Amazon Vendor presents unique supply chain complexities. Unlike traditional retail partnerships with predictable ordering cycles, Amazon uses automated replenishment systems that generate purchase orders dynamically based on real-time inventory levels and proprietary forecasting algorithms.</p>
        
        <p>Franklin Sports needed to anticipate <strong>not just consumer demand, but specifically when and how much Amazon's systems might order</strong> to optimize their own production planning, inventory positioning, and working capital allocation.</p>
        
        <h3>My Approach</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Step 1: Data Integration & Architecture</h4>
          <p>Integrated 5 primary datasets to build comprehensive analytical foundation:</p>
          <ul style="margin-bottom: 0;">
            <li><strong>Product Taxonomy:</strong> 197 ASINs across balls, goals, protective gear, training aids</li>
            <li><strong>Current Inventory Snapshot:</strong> On-hand levels at Amazon fulfillment centers</li>
            <li><strong>Predictive Demand Forecasts:</strong> 48-week horizon at 4 confidence levels (Mean, P70, P80, P90)</li>
            <li><strong>Open Purchase Orders:</strong> 2,516 line items representing in-transit inventory</li>
            <li><strong>Lead Time Data:</strong> Supplier-specific delivery windows (21 days domestic, 45 days import)</li>
          </ul>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Step 2: Recursive Simulation Framework</h4>
          <p>Built sophisticated simulation engine modeling Amazon's ordering decisions through 4 sequential steps repeated weekly:</p>
          <ul style="margin-bottom: 0;">
            <li><strong>Establish Beginning Inventory:</strong> Previous week's ending inventory + scheduled PO receipts</li>
            <li><strong>Calculate Inventory Drawdown:</strong> Subtract forecasted demand, calculate weeks-of-supply using 4-week rolling average</li>
            <li><strong>Trigger Reorder Logic:</strong> When weeks-of-supply falls below 4 weeks, generate PO to restore 8-week target</li>
            <li><strong>Project Forward:</strong> Updated inventory becomes input for next week's simulation</li>
          </ul>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Step 3: Multi-Dimensional Prioritization</h4>
          <p>Developed priority scoring framework ranking ASINs by:</p>
          <ul style="margin-bottom: 0;">
            <li><strong>Forecasted Unit Volume:</strong> Higher velocity products impact more customers</li>
            <li><strong>Inventory Urgency:</strong> Calculated as inverse of weeks-of-supply (1 / weeks coverage)</li>
            <li><strong>Projected Stockout Timing:</strong> ASINs projected to stock out within 4 weeks score higher</li>
          </ul>
          <p style="margin-top: 1rem;"><strong>Priority Score = Urgency × Volume</strong></p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>Step 4: Interactive Web Prototype</h4>
          <p>Built functional web-based dashboard enabling stakeholder exploration:</p>
          <ul style="margin-bottom: 0;">
            <li><strong>Executive Dashboard:</strong> Portfolio-level metrics showing aggregate inventory value and risk distribution</li>
            <li><strong>Scenario Selector:</strong> Interactive dropdown to switch between Mean/P70/P80/P90 forecast assumptions</li>
            <li><strong>Individual ASIN Simulator:</strong> Week-by-week breakdown with reorder trigger events</li>
            <li><strong>Priority Product List:</strong> Top 20 ASINs with priority scores and projected stockout timing</li>
          </ul>
        </div>
        
        <h3>Key Findings</h3>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem;">
          <h4 style="color: var(--accent-green);"><i class="fas fa-chart-line"></i> Portfolio Position Analysis</h4>
          <ul style="margin-bottom: 0;">
            <li><strong>43% of ASINs (85 products)</strong> maintained fewer than 4 weeks of coverage</li>
            <li><strong>10% held 12+ weeks of supply</strong>, representing working capital reallocation opportunities</li>
            <li><strong>76 potential stockout events</strong> projected over 12-week horizon</li>
            <li><strong>$6.05 million in average inventory value</strong> with 18.0-week average supply position</li>
          </ul>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem;">
          <h4 style="color: var(--accent-green);"><i class="fas fa-exclamation-triangle"></i> Lead Time Gap Challenge</h4>
          <ul style="margin-bottom: 0;">
            <li>Domestic products (21-day lead time) require minimum 3 weeks current supply</li>
            <li>Import products (45-day lead time) need 6 weeks coverage</li>
            <li>Many at-risk ASINs lacked sufficient in-transit inventory to bridge gaps</li>
          </ul>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
          <h4 style="color: var(--accent-green);"><i class="fas fa-star"></i> Strategic Prioritization</h4>
          <ul style="margin-bottom: 0;">
            <li>Top 20 high-volume ASINs account for <strong>45% of total projected demand</strong></li>
            <li>Combine high velocity with near-term stockout risk</li>
            <li>Warrant elevated service level targets and inventory buffers</li>
          </ul>
        </div>
        
        <h3>Business Impact</h3>
        
        <ul style="list-style: none; padding: 0;">
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Enabled proactive inventory positioning for $6M+ portfolio across 12-week planning horizon
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Identified 76 potential stockout events with quantified revenue impact
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Created repeatable framework for weekly supply chain planning integration
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Optimized working capital efficiency while maintaining service levels
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          <span class="skill-tag">Python</span>
          <span class="skill-tag">Pandas</span>
          <span class="skill-tag">NumPy</span>
          <span class="skill-tag">JavaScript</span>
          <span class="skill-tag">Chart.js</span>
          <span class="skill-tag">HTML/CSS</span>
          <span class="skill-tag">Inventory Optimization</span>
          <span class="skill-tag">Supply Chain Management</span>
        </div>
      `
    },
    employment: {
      title: 'Employment & Wage Trends Analysis',
      subtitle: 'Machine learning insights for workforce planning',
      content: `
        <h2>Employment & Wage Trends Analysis</h2>
        <p class="project-subtitle">Analyzing workforce patterns and policy impact</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">Python</span>
          <span class="project-tag">K-means Clustering</span>
          <span class="project-tag">Logistic Regression</span>
          <span class="project-tag">Statistical Analysis</span>
        </div>
        
        <h3>Business Questions</h3>
        <ul>
          <li>What are the U.S. industry employment and wage trends across NAICS sectors?</li>
          <li>Can we identify patterns in employment levels and wage variations?</li>
          <li>What industry clusters exist based on employment and wage metrics?</li>
          <li>What are the key predictors for high-wage industries?</li>
        </ul>
        
        <h3>Data Overview</h3>
        <p><strong>Source:</strong> Bureau of Labor Statistics (BLS), Quarterly data 2022-2024</p>
        <p><strong>Key Industries:</strong> Insurance carriers, Food manufacturing, Computing infrastructure, Telecommunications, Oil & gas extraction</p>
        
        <h3>Key Visualizations & Insights</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>1. Employment Trends by Industry (Time Series)</h4>
          <p><strong>Visualization:</strong> Multi-line chart showing quarterly employment from 2022-2024</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Insurance maintains steady 3,000-3,600 workers with seasonal patterns</li>
            <li>Telecommunications dropped from 1,400 to 500 workers in late 2023</li>
            <li>Food Manufacturing stable around 3,200 workers</li>
          </ul>
          <p><strong>Business Value:</strong> Identifies contracting industries needing workforce transition support</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>2. Wage Trends by Industry (Time Series)</h4>
          <p><strong>Visualization:</strong> Line chart showing average weekly wages over time</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Computing wages grew from $1,700 to $1,850</li>
            <li>Insurance wages declined from $1,800 peak to $1,400</li>
            <li>Food Manufacturing flat at ~$1,000 (no growth)</li>
          </ul>
          <p><strong>Business Value:</strong> Reveals wage stagnation in certain sectors requiring policy intervention</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>3. Logistic Regression Model Results</h4>
          <p><strong>Model Performance:</strong> 83% overall accuracy classifying high vs. low wage industries</p>
          <p><strong>Top Predictors (Feature Importance):</strong></p>
          <ul>
            <li>Employment volatility: 66.68</li>
            <li>Quarterly establishment count: 51.56</li>
            <li>Monthly employment levels: ~51.0</li>
            <li>Taxable quarterly wages: 42.76</li>
          </ul>
          <p><strong>Business Value:</strong> Identifies which structural factors drive high wages, guiding economic development strategy</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>4. K-Means Clustering Analysis</h4>
          <p><strong>Visualization:</strong> Scatterplot with 3 distinct clusters color-coded</p>
          <p><strong>Cluster Insights:</strong></p>
          <ul>
            <li><strong>Cluster 0 (Green):</strong> Low wages ($300-$1,300), low employment - small specialized industries</li>
            <li><strong>Cluster 1 (Orange):</strong> Medium wages ($1,300-$1,600), very high employment - mass employers</li>
            <li><strong>Cluster 2 (Purple):</strong> High wages ($1,400-$2,800), small workforce - specialized high-skill industries</li>
          </ul>
          <p><strong>Business Value:</strong> Enables tailored policy approaches for each industry archetype</p>
        </div>
        
        <h3>Business Applications</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <strong>Policy Planning:</strong> Target workforce development to contracting industries
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <strong>Economic Forecasting:</strong> Predict employment trends using time series patterns
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <strong>Compensation Benchmarking:</strong> Guide salary negotiations with industry-specific data
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <strong>Workforce Development:</strong> Design training programs for high-growth, high-wage clusters
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag">Python</span>
          <span class="skill-tag">Scikit-learn</span>
          <span class="skill-tag">Pandas</span>
          <span class="skill-tag">Matplotlib</span>
          <span class="skill-tag">Statistical Modeling</span>
        </div>
      `
    },
    sports: {
      title: 'Sports Scheduling Optimization',
      subtitle: 'Constraint programming for European soccer league',
      content: `
        <h2>Sports Scheduling Optimization</h2>
        <p class="project-subtitle">Optimizing double round-robin schedule for 10 teams</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">Python</span>
          <span class="project-tag">Google OR-Tools</span>
          <span class="project-tag">Constraint Programming</span>
          <span class="project-tag">Operations Research</span>
        </div>
        
        <div class="project-stats" style="margin-bottom: 2rem;">
          <div class="project-stat">
            <div class="project-stat-value">84,132</div>
            <div class="project-stat-label">Total KM Travel</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">90</div>
            <div class="project-stat-label">Matches Scheduled</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">1,620</div>
            <div class="project-stat-label">Decision Variables</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">18</div>
            <div class="project-stat-label">Week Schedule</div>
          </div>
        </div>
        
        <h3>Problem Statement</h3>
        <p>Create an optimal schedule for a 10-team European soccer super league (Manchester United, Real Madrid, Barcelona, Bayern Munich, PSG, AC Milan, Liverpool, Manchester City, Inter Milan, Arsenal) that minimizes total travel distance while maintaining competitive balance and adhering to standard scheduling constraints.</p>
        
        <h3>Key Visualizations & Analysis</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>1. Home/Away Pattern Matrix</h4>
          <p><strong>Visualization:</strong> Grid showing H (Home) and A (Away) distribution across 18 weeks for each team</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Visual confirmation: No team has more than 2 consecutive home or away games</li>
            <li>Color-coded green/blue pattern makes constraint violations immediately visible</li>
            <li>Balanced distribution: Each team has 4-5 home games per half</li>
          </ul>
          <p><strong>Business Value:</strong> Quick validation of fairness for league officials and broadcasters</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>2. Opponent Schedule Heatmap</h4>
          <p><strong>Visualization:</strong> Color-intensity matrix showing which teams play each week</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Each team pair meets exactly twice (once per half)</li>
            <li>Clear visual separation between Weeks 1-9 and 10-18</li>
            <li>No duplicate matchups in same half</li>
          </ul>
          <p><strong>Business Value:</strong> Helps broadcasters plan coverage and teams prepare scouting schedules</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>3. Travel Distance Analysis (Bar Chart + Table)</h4>
          <p><strong>Visualization:</strong> Ranked bar chart showing total travel per team</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Real Madrid: 11,852 km (highest due to Spain location)</li>
            <li>Barcelona: 9,657 km</li>
            <li>Arsenal: 6,364 km (lowest - central location benefit)</li>
            <li>PSG: 6,548 km</li>
            <li>2:1 ratio between highest and lowest demonstrates geographic impact</li>
          </ul>
          <p><strong>Business Value:</strong> Informs travel budget allocation and identifies teams needing additional rest protocols</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>4. Geographic Route Map</h4>
          <p><strong>Visualization:</strong> European map with lines showing away game travel routes</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>English teams cluster efficiently (Arsenal, Liverpool, Manchester clubs)</li>
            <li>Italian teams benefit from proximity (Milan clubs)</li>
            <li>Spain-to-England routes represent longest frequent journeys</li>
            <li>Central location advantage clearly visible for PSG</li>
          </ul>
          <p><strong>Business Value:</strong> Enables charter flight sharing negotiations and sustainability reporting</p>
        </div>
        
        <h3>Business Recommendations</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Implement tiered rest protocols based on travel burden
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Negotiate volume-based airline partnerships using predictable routes
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Coordinate shared charter flights for teams traveling similar routes
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Market carbon footprint reduction vs. non-optimized schedules
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag">Python</span>
          <span class="skill-tag">Google OR-Tools</span>
          <span class="skill-tag">CP-SAT Solver</span>
          <span class="skill-tag">Constraint Programming</span>
          <span class="skill-tag">Optimization Modeling</span>
        </div>
      `
    },
    churn: {
      title: 'Customer Churn Prediction Model',
      subtitle: 'Predictive analytics for customer retention',
      content: `
        <h2>Customer Churn Prediction Model</h2>
        <p class="project-subtitle">Predicting at-risk customers 3 months in advance</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">R</span>
          <span class="project-tag">Logistic Regression</span>
          <span class="project-tag">Statistical Modeling</span>
        </div>
        
        <h3>Business Challenge</h3>
        <p>QWE, a software company, was experiencing high customer churn and needed to identify at-risk customers early enough to implement retention strategies. The goal was to predict which customers would churn based on their behavior patterns and engagement metrics.</p>
        
        <h3>Key Visualizations & Model Analysis</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>1. Customer Age Distribution (Histogram)</h4>
          <p><strong>Visualization:</strong> Frequency histogram showing customer tenure in months</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Highest frequency at 0-10 months (1,100+ customers)</li>
            <li>Steep decline in retention as customer age increases</li>
            <li>Right-skewed distribution indicates early-stage retention problem</li>
            <li>Very few customers survive beyond 40 months</li>
          </ul>
          <p><strong>Business Value:</strong> Highlights critical need for early engagement within first 10 months</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>2. Churn by Customer Age (Boxplot Comparison)</h4>
          <p><strong>Visualization:</strong> Side-by-side boxplots comparing churned vs retained customers</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Median age of churned customers: 12 months</li>
            <li>Median age of retained customers: 16 months</li>
            <li>Critical retention window: 6-14 months (IQR for churned)</li>
            <li>Customers surviving past 14 months much less likely to churn</li>
          </ul>
          <p><strong>Business Value:</strong> Identifies 6-14 month period as critical intervention window for retention campaigns</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>3. Logistic Regression Model Results</h4>
          <p><strong>Model Performance:</strong> 85% accuracy in predicting customer churn</p>
          <p><strong>Significant Predictors (p < 0.05):</strong></p>
          <ul>
            <li><strong>customer_age:</strong> Coefficient = 0.013 (p=0.018) - Slight increase in churn with age</li>
            <li><strong>chi_score_month_0:</strong> Coefficient = -0.005 (p<0.001) - Higher satisfaction reduces churn</li>
            <li><strong>chi_score_0-1:</strong> Coefficient = -0.01 (p<0.001) - Sustained satisfaction protective</li>
            <li><strong>views_0-1:</strong> Coefficient = -0.0 (p=0.007) - Product engagement reduces churn</li>
            <li><strong>days_since_last_login:</strong> Coefficient = 0.017 (p<0.001) - Inactivity predicts churn</li>
          </ul>
          <p><strong>Business Value:</strong> Provides specific behavioral triggers for automated retention interventions</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>4. Model Prediction Examples</h4>
          <p><strong>Validation Cases:</strong></p>
          <ul>
            <li><strong>Customer 672:</strong> 35% churn probability → Actually churned ✓</li>
            <li><strong>Customer 357:</strong> 3.8% churn probability → Did not churn ✓</li>
            <li><strong>Customer 5203:</strong> 4.3% churn probability → Did not churn ✓</li>
          </ul>
          <p><strong>Business Value:</strong> Demonstrates model's ability to identify high-risk (>30%) vs low-risk (<10%) customers</p>
        </div>
        
        <h3>Model Strengths & Improvements</h3>
        <p><strong>Strengths:</strong> Interpretable predictors, statistically significant variables, reasonable discrimination between high/low risk</p>
        <p><strong>Proposed Enhancement:</strong> Add interaction terms between customer age segments (0-5, 6-14, 15+ months) and CHI score/support cases to capture varying effects across customer lifecycle stages</p>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag">R</span>
          <span class="skill-tag">Logistic Regression</span>
          <span class="skill-tag">ggplot2</span>
          <span class="skill-tag">Statistical Testing</span>
        </div>
      `
    },
    retail: {
      title: 'Retail Sales & Customer Analysis',
      subtitle: 'SQL database design and profitability drivers',
      content: `
        <h2>Retail Sales & Customer Analysis</h2>
        <p class="project-subtitle">SQL database design and statistical analysis</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">SQL</span>
          <span class="project-tag">Database Design</span>
          <span class="project-tag">Regression Analysis</span>
          <span class="project-tag">Hypothesis Testing</span>
        </div>
        
        <h3>Project Overview</h3>
        <p>Designed relational database schema to model customer, sales, and store relationships. Conducted comprehensive data analysis including cleaning, hypothesis testing, and regression modeling to identify profitability drivers and provide actionable recommendations for underperforming stores.</p>
        
        <h3>Database Design & SQL Analysis</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>1. Entity Relationship Diagram (ERD)</h4>
          <p><strong>Design:</strong> Four interconnected tables with proper normalization</p>
          <p><strong>Tables:</strong></p>
          <ul>
            <li><strong>Customers:</strong> Demographics (age, income, education) with CustomerID primary key</li>
            <li><strong>Sales:</strong> Transaction records linking customers to products and stores</li>
            <li><strong>Stores:</strong> Location characteristics and performance metrics</li>
            <li><strong>Products:</strong> Category, pricing, and cost data</li>
          </ul>
          <p><strong>Business Value:</strong> Enables complex multi-dimensional analysis of retail performance</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>2. Sales by Product Category (SQL Query Results)</h4>
          <p><strong>Analysis:</strong> Aggregate revenue and margin analysis using GROUP BY queries</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Electronics: Highest revenue category with strong margins</li>
            <li>Clothing: High volume but lower margins (discount-driven)</li>
            <li>Home Goods: Balanced revenue and margin profile</li>
          </ul>
          <p><strong>Business Value:</strong> Informs inventory allocation and promotional strategy</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>3. Store Performance Ranking (SQL + Visualization)</h4>
          <p><strong>Analysis:</strong> JOIN queries comparing store metrics with location demographics</p>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Urban stores outperform suburban by 35%</li>
            <li>High-income areas show 2.5x higher average transaction value</li>
            <li>Certain stores underperform despite favorable demographics (operational issues)</li>
          </ul>
          <p><strong>Business Value:</strong> Identifies specific stores needing operational improvements vs. market limitations</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>4. Regression Analysis (R² = 0.48)</h4>
          <p><strong>Model:</strong> Multiple regression predicting gross profit margin</p>
          <p><strong>Significant Predictors:</strong></p>
          <ul>
            <li>Sales amount: Positive coefficient (higher sales = better margins)</li>
            <li>Product category: Electronics and luxury goods drive margins</li>
            <li>Discount level: Negative impact as expected</li>
            <li>Store location: Urban premium confirmed</li>
          </ul>
          <p><strong>Business Value:</strong> Validates pricing strategies and quantifies discount impact on profitability</p>
        </div>
        
        <h3>Key Recommendations</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <strong>Category Mix:</strong> Increase high-margin electronics and reduce low-margin clothing inventory
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <strong>Discounting:</strong> Implement strategic discounting only for inventory clearance, not as default strategy
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <strong>Underperforming Stores:</strong> Conduct operational audits at stores below expected performance given demographics
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag">SQL</span>
          <span class="skill-tag">Oracle SQL Developer</span>
          <span class="skill-tag">R</span>
          <span class="skill-tag">Regression Analysis</span>
          <span class="skill-tag">Database Design</span>
        </div>
      `
    },
    facility: {
      title: 'Facility & Budget Optimization',
      subtitle: 'Linear programming for resource allocation',
      content: `
        <h2>Facility & Budget Optimization</h2>
        <p class="project-subtitle">Linear programming for resource allocation</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">Excel Solver</span>
          <span class="project-tag">R</span>
          <span class="project-tag">Linear Programming</span>
          <span class="project-tag">lpSolve</span>
        </div>
        
        <h3>Dual Optimization Problems</h3>
        
        <h3>Problem 1: Summit Fitness Space Allocation</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Objective</h4>
          <p>Maximize annual revenue from 25,000 sq ft facility by optimally allocating space across 7 facility types: Cardio, Strength, Group Fitness, Pool, Café, Waiting Area, and Locker Rooms</p>
          <p><strong>Optimal Revenue:</strong> $1,545,620 annually</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Visualization 1: Optimal Space Allocation (Pie Chart)</h4>
          <p><strong>Results:</strong></p>
          <ul>
            <li>Strength Training: 11,368.5 sq ft (45.5%)</li>
            <li>Cardio: 9,301.5 sq ft (37.2%)</li>
            <li>Pool: 1,800 sq ft (7.2%)</li>
            <li>Café: 1,250 sq ft (5%)</li>
            <li>Group Fitness: 800 sq ft (3.2%)</li>
            <li>Supporting spaces: 480 sq ft (1.9%)</li>
          </ul>
          <p><strong>Business Value:</strong> Strength and Cardio dominate allocation due to highest revenue per sq ft ($68 and $58 respectively)</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Visualization 2: Revenue by Facility Type (Bar Chart)</h4>
          <p><strong>Annual Revenue Breakdown:</strong></p>
          <ul>
            <li>Strength Training: $773,058 (50%)</li>
            <li>Cardio: $539,487 (35%)</li>
            <li>Café: $106,875 (7%) - highest revenue per sq ft at $85.50</li>
            <li>Pool: $84,600 (5.5%)</li>
            <li>Group Fitness: $41,600 (2.7%)</li>
          </ul>
          <p><strong>Business Value:</strong> Café shows exceptional space efficiency despite small footprint</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Sensitivity Analysis Insights</h4>
          <p><strong>Shadow Prices (Marginal Values):</strong></p>
          <ul>
            <li><strong>Total Space:</strong> $64.60 per sq ft - adding 5,000 sq ft generates $323K additional revenue</li>
            <li><strong>Group Fitness:</strong> Would need $73.025/sq ft (vs current $52) to justify expansion</li>
            <li><strong>Pool Reduction:</strong> Reducing from 1,800 to 1,500 sq ft saves $8,760 annually</li>
          </ul>
          <p><strong>Business Value:</strong> Quantifies ROI for expansion decisions and facility modifications</p>
        </div>
        
        <h3>Problem 2: Marketing Budget Allocation</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Objective</h4>
          <p>Maximize customer reach from $100K marketing budget across 4 channels: Social Media, TV, Email, and Print</p>
          <p><strong>Optimal Reach:</strong> 794,444 impressions</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Visualization: Marketing Budget Distribution (Donut Chart)</h4>
          <p><strong>Optimal Allocation:</strong></p>
          <ul>
            <li>Social Media: $39,722 (40%) - highest reach per dollar (10:1 ratio)</li>
            <li>Email: $25,278 (25%) - strong digital performance (8:1 ratio)</li>
            <li>TV: $20,000 (20%) - at minimum threshold (6:1 ratio)</li>
            <li>Print: $15,000 (15%) - at minimum threshold (5:1 ratio)</li>
          </ul>
          <p><strong>Business Value:</strong> Digital channels (Social + Email) receive 65% of budget due to superior efficiency</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>Sensitivity Analysis for Budget Increase</h4>
          <p><strong>Shadow Price:</strong> $8.44 reach per additional dollar</p>
          <p><strong>Scenario:</strong> Adding $10,000 to marketing budget</p>
          <p><strong>Expected Impact:</strong> Additional 84,444 impressions, bringing total reach to 878,888</p>
          <p><strong>Business Value:</strong> Provides clear ROI for budget increase requests</p>
        </div>
        
        <h3>Key Takeaways</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Strength training and cardio offer best space utilization for fitness facility
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Digital marketing channels (Social + Email) deliver superior reach efficiency
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Shadow price analysis provides data-driven justification for expansion investments
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag">Excel Solver</span>
          <span class="skill-tag">R</span>
          <span class="skill-tag">lpSolve</span>
          <span class="skill-tag">Linear Programming</span>
          <span class="skill-tag">Sensitivity Analysis</span>
        </div>
      `
    },
    logistics: {
      title: 'SourceSage: Campus Courier Service',
      subtitle: 'Peer-to-peer logistics app for campus deliveries',
      content: `
        <h2>SourceSage: Campus Courier Service</h2>
        <p class="project-subtitle">Peer-to-peer logistics app for campus deliveries</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">AppSheet</span>
          <span class="project-tag">Database Design</span>
          <span class="project-tag">No-Code Development</span>
          <span class="project-tag">Mobile App</span>
        </div>
        
        <div class="project-stats" style="margin-bottom: 2rem;">
          <div class="project-stat">
            <div class="project-stat-value">3</div>
            <div class="project-stat-label">Database Tables</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">6</div>
            <div class="project-stat-label">Active Couriers</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">10</div>
            <div class="project-stat-label">Package Records</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">3</div>
            <div class="project-stat-label">Status-Based Views</div>
          </div>
        </div>
        
        <h3>Business Problem</h3>
        <p>Northeastern University students struggle with time constraints and limited access to quick, affordable delivery for essential items. Traditional services are expensive and slow for small campus deliveries. Students also lack flexible earning opportunities that fit academic schedules.</p>
        
        <h3>App Views & Functionality</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>1. Couriers View (Deck Display)</h4>
          <p><strong>Purpose:</strong> Display active delivery personnel with profile information</p>
          <p><strong>Features:</strong></p>
          <ul>
            <li>Visual courier cards with photos and IDs (C0001-C0006)</li>
            <li>Active/Inactive status filtering</li>
            <li>Direct email contact buttons</li>
            <li>Add new courier functionality</li>
          </ul>
          <p><strong>Business Value:</strong> Quick courier availability check and workload monitoring for dispatchers</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>2. Package View - Three Status Slices</h4>
          <p><strong>A. Delivered Packages Slice</strong></p>
          <ul>
            <li>Shows completed deliveries (P001, P003, P004, P006)</li>
            <li>Complete delivery history with timestamps</li>
            <li>Courier performance tracking</li>
          </ul>
          <p><strong>B. In Transit Packages Slice</strong></p>
          <ul>
            <li>Active deliveries currently en route (P002, P005, P008, P009, P010)</li>
            <li>Real-time courier assignment visible</li>
            <li>Delivery deadline monitoring</li>
          </ul>
          <p><strong>C. Pending Packages Slice</strong></p>
          <ul>
            <li>Awaiting courier pickup (P007)</li>
            <li>Priority flagging for urgent deliveries</li>
            <li>Courier assignment interface</li>
          </ul>
          <p><strong>Business Value:</strong> Status-based organization enables efficient package management and prevents missed deadlines</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>3. Transaction History View (Audit Trail)</h4>
          <p><strong>Purpose:</strong> Complete audit trail of all package movements</p>
          <p><strong>Tracked Information:</strong></p>
          <ul>
            <li>Transaction IDs (T001-T014) with precise timestamps</li>
            <li>Action types: Pickup, Handoff, Delivery</li>
            <li>Status before/after each transaction</li>
            <li>Courier responsible for each action</li>
          </ul>
          <p><strong>Business Value:</strong> Accountability for disputes, performance metrics, and operational bottleneck identification</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>4. Package Map View (Geographic Visualization)</h4>
          <p><strong>Features:</strong></p>
          <ul>
            <li>Real-time package location markers</li>
            <li>Color-coded by status (Pending/In Transit/Delivered)</li>
            <li>Route lines showing courier travel paths</li>
            <li>Building labels for campus locations</li>
          </ul>
          <p><strong>Key Insights:</strong></p>
          <ul>
            <li>Package clustering around Khoury College and Hayden Hall</li>
            <li>Average delivery distance: 0.5 miles on campus</li>
          </ul>
          <p><strong>Business Value:</strong> Enables dynamic courier dispatch and route optimization</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>5. Action Buttons & Workflow</h4>
          <p><strong>Three Key Actions:</strong></p>
          <ul>
            <li><strong>Accept Package:</strong> Changes Pending → In Transit, assigns courier, creates transaction</li>
            <li><strong>Mark as Delivered:</strong> Updates In Transit → Delivered, logs completion timestamp</li>
            <li><strong>Log Transaction:</strong> Manual entry for handoffs and special circumstances</li>
          </ul>
          <p><strong>Business Value:</strong> Intuitive interface requires minimal training for new couriers</p>
        </div>
        
        <h3>Database Architecture</h3>
        <p><strong>Three Interconnected Tables:</strong></p>
        <ul>
          <li><strong>Couriers:</strong> Courier profiles, contact info, status, building location</li>
          <li><strong>Packages:</strong> Comprehensive delivery details, sender/recipient info, locations, timing</li>
          <li><strong>Transaction_History:</strong> Complete audit trail with before/after status tracking</li>
        </ul>
        
        <h3>Key Features</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            Complete package lifecycle tracking from order to delivery
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            Real-time status updates with email/SMS notifications
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            Geographic mapping for optimal courier routing
          </li>
          <li style="padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            Complete audit trail for accountability and dispute resolution
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag">AppSheet</span>
          <span class="skill-tag">Google Sheets</span>
          <span class="skill-tag">Database Design</span>
          <span class="skill-tag">Mobile Development</span>
          <span class="skill-tag">Workflow Automation</span>
        </div>
      `
    },
    dbms: {
      title: 'Husky Restaurant Review Database System',
      subtitle: 'End-to-end relational database design and implementation',
      content: `
        <h2>Husky Restaurant Review Database System</h2>
        <p class="project-subtitle">End-to-end relational database design and implementation</p>
        
        <div class="project-tags" style="margin-bottom: 2rem;">
          <span class="project-tag">SQL</span>
          <span class="project-tag">Oracle</span>
          <span class="project-tag">Database Design</span>
          <span class="project-tag">ER Modeling</span>
          <span class="project-tag">3NF Normalization</span>
        </div>
        
        <div class="project-stats" style="margin-bottom: 2rem;">
          <div class="project-stat">
            <div class="project-stat-value">11</div>
            <div class="project-stat-label">Database Tables</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">3NF</div>
            <div class="project-stat-label">Normalized</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">6</div>
            <div class="project-stat-label">Business Queries</div>
          </div>
          <div class="project-stat">
            <div class="project-stat-value">4</div>
            <div class="project-stat-label">Project Phases</div>
          </div>
        </div>
        
        <h3>Problem Statement</h3>
        <p>Designed a platform to help students and local users discover, review, and recommend restaurants around campus. As the platform grows with hundreds of users browsing, reviewing, and making reservations simultaneously, a robust relational database was essential to ensure data consistency, accessibility, and integrity.</p>
        
        <h3>Project Phases</h3>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 1: Project Proposal</h4>
          <p><strong>Core Functionality Defined:</strong></p>
          <ul>
            <li>User Management, Credit Card Storage, Restaurant Management (Multi-service)</li>
            <li>Company Ownership Tracking, Review System, Recommendations, Reservations</li>
          </ul>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 2: Conceptual Design (ER Diagram)</h4>
          <p><strong>11 Entities Designed:</strong> User, CreditCard, Company, Restaurant, SitDownRestaurant, TakeOutRestaurant, FoodCartRestaurant, Review, Recommendation, Reservation, ZipCode</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 3: Logical Design (3NF Normalization)</h4>
          <p><strong>Key Decisions:</strong> Achieved 3NF, separated ZipCode table, surrogate keys for security, composite keys for relationships, CASCADE DELETE constraints</p>
        </div>
        
        <div style="background-color: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid var(--primary-blue);">
          <h4>Phase 4: Physical Implementation (Oracle SQL)</h4>
          <p><strong>Successfully Loaded:</strong> 6 users, 3 companies, 11 restaurants, 14 reviews, 15 recommendations, 8 reservations</p>
        </div>
        
        <h3>Business Queries (Phase 5)</h3>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.75rem;">
          <h4 style="color: var(--accent-green);">Query 1: Location-Based Search (ZIP 98105)</h4>
          <p>Enables students to find nearby restaurants quickly</p>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.75rem;">
          <h4 style="color: var(--accent-green);">Query 2: Reservation Schedule</h4>
          <p>Helps restaurants manage staffing and table assignments</p>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.75rem;">
          <h4 style="color: var(--accent-green);">Query 3: Top Recommended Restaurants</h4>
          <p>Surfaces community favorites for social proof</p>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.75rem;">
          <h4 style="color: var(--accent-green);">Query 4: Take-Out Wait Times</h4>
          <p>Identifies quick meal options for students with limited breaks</p>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.75rem;">
          <h4 style="color: var(--accent-green);">Query 5: Highest Rated Restaurants</h4>
          <p>Quality-driven recommendations based on peer reviews</p>
        </div>
        
        <div style="background-color: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <h4 style="color: var(--accent-green);">Query 6: Most Active Users</h4>
          <p>Identifies power users for rewards and retention</p>
        </div>
        
        <h3>Business Impact</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Scalable database supporting hundreds of concurrent users
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Zero data redundancy through proper normalization
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Complex business queries enabled through proper relationship modeling
          </li>
          <li style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background-color: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md);">
            <i class="fas fa-check-circle" style="color: var(--accent-green);"></i>
            Data integrity guaranteed through constraints and cascade operations
          </li>
        </ul>
        
        <h3 style="margin-top: 2rem;">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <span class="skill-tag">SQL</span>
          <span class="skill-tag">Oracle SQL Developer</span>
          <span class="skill-tag">ER Modeling</span>
          <span class="skill-tag">Database Normalization</span>
          <span class="skill-tag">Data Integrity</span>
        </div>
      `
    }
  };

// Open modal function
function openModal(projectId) {
  const project = projectData[projectId];
  if (project) {
    modalBody.innerHTML = project.content;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

// Close modal function
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .experience-card, .contact-card').forEach(el => {
  fadeInObserver.observe(el);
});

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// INITIALIZE
// ============================================

console.log('Portfolio loaded successfully! 🚀');
console.log('Made with ❤️ by Ankita Singh');

// ============================================
// GOOGLE ANALYTICS EVENT TRACKING
// ============================================

// Helper function to track events
function trackEvent(eventName, eventParams = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventParams);
    console.log('📊 Analytics Event:', eventName, eventParams);
  }
}

// Track resume downloads
document.querySelectorAll('a[href*="Resume.pdf"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('download_resume', {
      'event_category': 'Downloads',
      'event_label': 'Resume PDF',
      'location': link.closest('section')?.id || 'navigation'
    });
  });
});

// Track portfolio PDF downloads
document.querySelectorAll('a[href*="Portfolio.pdf"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('download_portfolio', {
      'event_category': 'Downloads',
      'event_label': 'Portfolio PDF',
      'location': link.closest('section')?.id || 'navigation'
    });
  });
});

// Track project modal opens
const originalOpenModal = window.openModal;
window.openModal = function(projectId) {
  trackEvent('view_project_details', {
    'event_category': 'Engagement',
    'event_label': projectId,
    'project_name': projectData[projectId]?.title || projectId
  });
  originalOpenModal(projectId);
};

// Track external link clicks (LinkedIn, GitHub, Email)
document.querySelectorAll('a[href^="https://linkedin.com"], a[href^="https://github.com"], a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', () => {
    const url = link.href;
    let linkType = 'external';
    
    if (url.includes('linkedin')) linkType = 'LinkedIn';
    else if (url.includes('github')) linkType = 'GitHub';
    else if (url.includes('mailto')) linkType = 'Email';
    
    trackEvent('click_external_link', {
      'event_category': 'Outbound Links',
      'event_label': linkType,
      'url': url
    });
  });
});

// Track section scrolls
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      trackEvent('view_section', {
        'event_category': 'Engagement',
        'event_label': entry.target.id,
        'section_name': entry.target.id
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// Track project filter usage
filterBtns.forEach(btn => {
  const originalClickHandler = btn.onclick;
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    trackEvent('filter_projects', {
      'event_category': 'Engagement',
      'event_label': filter,
      'filter_type': 'projects'
    });
  });
});

// Track skills filter usage
categoryBtns.forEach(btn => {
  const originalClickHandler = btn.onclick;
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    trackEvent('filter_skills', {
      'event_category': 'Engagement',
      'event_label': category,
      'filter_type': 'skills'
    });
  });
});

// Track time on site
let timeOnSite = 0;
setInterval(() => {
  timeOnSite += 30;
  if (timeOnSite % 60 === 0) { // Every 60 seconds
    trackEvent('time_on_site', {
      'event_category': 'Engagement',
      'event_label': `${timeOnSite} seconds`,
      'value': timeOnSite
    });
  }
}, 30000); // Check every 30 seconds

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
  const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
  
  if (scrollPercent > maxScrollDepth) {
    maxScrollDepth = scrollPercent;
    
    // Track at 25%, 50%, 75%, 100%
    if ([25, 50, 75, 100].includes(scrollPercent)) {
      trackEvent('scroll_depth', {
        'event_category': 'Engagement',
        'event_label': `${scrollPercent}%`,
        'value': scrollPercent
      });
    }
  }
});