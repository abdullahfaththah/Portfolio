import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "ABDULLAH FATHTHAH",
    role: "Aspiring IT Professional & Cloud Enthusiast",
    email: "abdullahfaththah@gmail.com",
    phone: "+94777950890",
    location: "182/A/2 primary school road, Malwana",
    website: "www.abdullahfaththah.site",
    linkedin: "https://www.linkedin.com/in/abdullahfaththah",
    github: "https://github.com/abdullahfaththah",
    instagram: "https://www.instagram.com/abdullahfaththah",
    facebook: "https://www.facebook.com/abdullahfaththah",
    snapchat: "https://www.snapchat.com/add/abdullahfaththah",
    x: "https://x.com/abdullahfaththah",
    wechat: "weixin://dl/chat?abdullahfaththah",
    summary: "I am a self-motivated aspiring IT professional with practical experience in system support, troubleshooting, and hardware/software management. Proficient in maintaining IT infrastructure. I have a strong interest in technical support and IT service delivery. As a proactive learner and collaborative team member, I am committed to enhancing productivity and providing exceptional user support in every task I undertake.",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Abdullah&accessories=prescription02&facialHair=beardLight&top=shortFlat&hairColor=2c1b18&skinColor=edb98a&clothing=blazerAndShirt&eyes=happy",
  },
  education: [
    {
      degree: "BSc in Computer Science",
      school: "University of Bedfordshire",
      year: "2025 - 2026"
    },
    {
      degree: "HND in Information Technology",
      school: "SLIIT CITY UNI",
      year: "2023 - 2025"
    },
    {
      degree: "G C E Advanced Level (Physical Science)",
      school: "Zahira College Colombo",
      year: "2020 - 2023"
    }
  ],
  certifications: [
    "Certified in Cybersecurity by (ISC)² - Certified",
    "Google Cybersecurity Specialization Certificate - Certified",
    "AWS Solution Architect Associate (SAA-C03) - Udemy",
    "Microsoft Azure Certification Course by Intellipaat",
    "HackTheBox Bug Bounty Hunter Certification"
  ],
  skills: [
    {
      category: "DevOps & Cloud",
      items: ["AWS Core Services", "Azure DevOps", "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "Prometheus", "GitHub Actions"]
    },
    {
      category: "Programming & Scripting",
      items: ["Java", "Python (Basic)", "C++", "YAML", "SQL / NoSQL"]
    },
    {
      category: "Web Development",
      items: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"]
    },
    {
      category: "Soft Skills",
      items: ["Team Collaboration", "Problem Solving", "Critical Thinking", "Time Management", "Attention to Details"]
    }
  ],
  projects: [
    {
      title: "Automated Web Application Deployment",
      description: "End-to-end deployment pipeline using Jenkins, Terraform, Ansible, Prometheus, and AWS EC2.",
      tech: ["Jenkins", "Terraform", "Ansible", "Prometheus", "AWS EC2"],
      details: [
        "Infrastructure as Code (IaC) with Terraform to provision VPC, Subnets, and EC2.",
        "Configuration Management with Ansible to install Apache and deploy PHP apps.",
        "CI/CD Pipeline Automation integrating Terraform and Ansible via Jenkins.",
        "Monitoring and Observability using Prometheus and Grafana."
      ]
    },
    {
      title: "Kubernetes on AWS EKS with Ingress",
      description: "Deployed scalable containerized applications on AWS EKS.",
      tech: ["AWS EKS", "Docker", "Kubernetes", "AWS IAM", "Ingress"],
      details: [
        "Provisioned EKS clusters using eksctl.",
        "Deployed sample apps from Amazon ECR to EKS.",
        "Configured AWS Load Balancer Controller for traffic routing.",
        "Implemented IRSA (IAM Roles for Service Accounts) for secure access."
      ]
    },
    {
      title: "SIEM Solution Deployment",
      description: "Deployed Elastic Stack for security monitoring and threat detection.",
      tech: ["Elastic Cloud", "Kibana", "Elastic Agents", "Sysmon"],
      details: [
        "Setup Cloud-Based SIEM for threat detection.",
        "Configured Elasticsearch for centralized logs and Kibana for visualization.",
        "Integrated Endpoint Data Collection using Elastic Agents and Sysmon.",
        "Built Security Dashboards for system activity tracking."
      ]
    },
    {
      title: "Automated Website Hosting on AWS",
      description: "Serverless hosting with CI/CD via GitHub Actions.",
      tech: ["AWS S3", "GitHub Actions", "AWS IAM"],
      details: [
        "Hosted static website on Amazon S3 for high availability.",
        "Implemented CI/CD pipeline using GitHub Actions for automated deployment.",
        "Enforced secure access management with IAM policies."
      ]
    },
    {
      title: "Full-Stack E-commerce Application",
      description: "MERN stack application with Admin Panel.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Selenium"],
      details: [
        "Implemented secure user authentication and product listings.",
        "Built shopping cart and order management system.",
        "Designed responsive admin dashboard for inventory management.",
        "Integrated Selenium-based automated testing."
      ]
    }
  ]
};