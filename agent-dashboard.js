// Agent Dashboard JavaScript

// Check authentication
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    loadProjects();
    loadUpcomingProjects();
    loadStatistics();
    setupFilters();
});

function checkAuthentication() {
    const userData = getUserData();
    
    if (!userData || !userData.loggedIn) {
        alert('Please login to access agent dashboard');
        window.location.href = 'login.html?redirect=agent-dashboard.html';
        return false;
    }
    
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    if (registeredUser.userType !== 'agent') {
        alert('This page is only accessible to real estate agents');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

function getUserData() {
    const localData = localStorage.getItem('userData');
    const sessionData = sessionStorage.getItem('userData');
    
    if (localData) {
        return JSON.parse(localData);
    } else if (sessionData) {
        return JSON.parse(sessionData);
    }
    
    return null;
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('agentProjects') || '[]');
    const container = document.getElementById('projectsContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (projects.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'block';
    emptyState.style.display = 'none';
    
    container.innerHTML = projects.map(project => `
        <div class="project-card" data-type="${project.type}" data-status="${project.status || 'active'}">
            <div class="project-header">
                <div>
                    <h3 style="margin: 0 0 0.5rem 0;">${project.clientName}</h3>
                    <p style="color: var(--text-gray); margin: 0; font-size: 0.875rem;">
                        <i class="fas fa-briefcase"></i> ${project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </p>
                </div>
                <span class="project-status status-${project.status || 'active'}">${(project.status || 'active').toUpperCase()}</span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                <div>
                    <p style="margin: 0; color: var(--text-gray); font-size: 0.875rem;">Budget</p>
                    <p style="margin: 0.25rem 0 0 0; font-weight: 700; color: var(--primary-color);">
                        ₹${parseInt(project.budget).toLocaleString('en-IN')}
                    </p>
                </div>
                <div>
                    <p style="margin: 0; color: var(--text-gray); font-size: 0.875rem;">Location</p>
                    <p style="margin: 0.25rem 0 0 0; font-weight: 600;">
                        ${project.location || 'Not specified'}
                    </p>
                </div>
                <div>
                    <p style="margin: 0; color: var(--text-gray); font-size: 0.875rem;">Timeline</p>
                    <p style="margin: 0.25rem 0 0 0; font-weight: 600;">
                        ${project.timeline || 'Flexible'}
                    </p>
                </div>
                <div>
                    <p style="margin: 0; color: var(--text-gray); font-size: 0.875rem;">Contact</p>
                    <p style="margin: 0.25rem 0 0 0; font-weight: 600;">
                        ${project.contact || 'N/A'}
                    </p>
                </div>
            </div>
            
            ${project.requirements ? `
                <div style="margin: 1rem 0; padding: 1rem; background: white; border-radius: 6px;">
                    <p style="margin: 0; font-size: 0.875rem; color: var(--text-gray);">
                        <strong>Requirements:</strong> ${project.requirements}
                    </p>
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <button onclick="viewProject('${project.id}')" class="btn-view" style="flex: 1; padding: 0.5rem; border: none; background: var(--primary-color); color: white; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button onclick="editProject('${project.id}')" class="btn-edit" style="flex: 1; padding: 0.5rem; border: none; background: var(--bg-light); color: var(--text-dark); border-radius: 6px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteProject('${project.id}')" class="btn-delete" style="padding: 0.5rem 1rem; border: none; background: #e74c3c; color: white; border-radius: 6px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function loadUpcomingProjects() {
    // Get properties posted by sellers (these are leads for agents)
    const allProperties = JSON.parse(localStorage.getItem('userProperties') || '[]');
    const container = document.getElementById('upcomingProjectsContainer');
    
    // Simulate some sample upcoming projects
    const sampleProjects = [
        {
            id: 'proj1',
            clientName: 'John Doe',
            type: 'Residential',
            budget: 8000000,
            location: 'Gachibowli, Hyderabad',
            requirements: '3 BHK apartment, modern amenities, parking',
            postedDate: '2 days ago'
        },
        {
            id: 'proj2',
            clientName: 'ABC Corporation',
            type: 'Commercial',
            budget: 50000000,
            location: 'Hitec City, Hyderabad',
            requirements: 'Office space, 10,000 sq ft, central location',
            postedDate: '5 days ago'
        },
        {
            id: 'proj3',
            clientName: 'Maria Garcia',
            type: 'Land',
            budget: 15000000,
            location: 'Kompally, Hyderabad',
            requirements: 'Residential plot, 200-300 sq yards, HMDA approved',
            postedDate: '1 week ago'
        }
    ];
    
    if (sampleProjects.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: 2rem;">No new projects available</p>';
        return;
    }
    
    container.innerHTML = sampleProjects.map(project => `
        <div class="property-card">
            <div style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="margin: 0 0 0.5rem 0;">${project.clientName}</h3>
                        <p style="color: var(--text-gray); margin: 0; font-size: 0.875rem;">
                            <i class="fas fa-building"></i> ${project.type}
                        </p>
                    </div>
                    <span style="background: var(--primary-light); color: var(--primary-color); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                        NEW
                    </span>
                </div>
                
                <div style="margin: 1rem 0;">
                    <p style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 700; color: var(--primary-color);">
                        Budget: ₹${parseInt(project.budget).toLocaleString('en-IN')}
                    </p>
                    <p style="margin: 0; color: var(--text-gray);">
                        <i class="fas fa-map-marker-alt"></i> ${project.location}
                    </p>
                </div>
                
                <div style="background: var(--bg-light); padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                    <p style="margin: 0; font-size: 0.875rem; color: var(--text-gray);">
                        <strong>Requirements:</strong> ${project.requirements}
                    </p>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                    <span style="font-size: 0.875rem; color: var(--text-gray);">
                        <i class="fas fa-clock"></i> Posted ${project.postedDate}
                    </span>
                    <button onclick="contactClient('${project.id}')" class="btn-save" style="padding: 0.5rem 1rem;">
                        <i class="fas fa-phone"></i> Contact
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadStatistics() {
    const projects = JSON.parse(localStorage.getItem('agentProjects') || '[]');
    
    const activeProjects = projects.filter(p => (p.status || 'active') === 'active').length;
    const totalLeads = 12; // Sample
    const totalClients = projects.length;
    const totalCommission = projects.reduce((sum, p) => sum + (parseInt(p.budget) * 0.02), 0); // 2% commission estimate
    
    document.getElementById('totalProjects').textContent = activeProjects;
    document.getElementById('totalLeads').textContent = totalLeads;
    document.getElementById('totalClients').textContent = totalClients;
    document.getElementById('totalCommission').textContent = '₹' + Math.round(totalCommission).toLocaleString('en-IN');
}

function setupFilters() {
    const projectFilter = document.getElementById('projectFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (projectFilter) {
        projectFilter.addEventListener('change', filterProjects);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterProjects);
    }
}

function filterProjects() {
    const type = document.getElementById('projectFilter').value;
    const status = document.getElementById('statusFilter').value;
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const matchType = type === 'all' || card.dataset.type === type;
        const matchStatus = status === 'all' || card.dataset.status === status;
        
        if (matchType && matchStatus) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function addNewProject() {
    document.getElementById('addProjectModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addProjectModal').style.display = 'none';
    document.getElementById('addProjectForm').reset();
}

function saveProject(event) {
    event.preventDefault();
    
    const project = {
        id: 'proj_' + Date.now(),
        clientName: document.getElementById('clientName').value,
        type: document.getElementById('projectType').value,
        budget: document.getElementById('projectBudget').value,
        location: document.getElementById('projectLocation').value,
        requirements: document.getElementById('projectRequirements').value,
        timeline: document.getElementById('projectTimeline').value,
        contact: document.getElementById('projectContact').value,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    let projects = JSON.parse(localStorage.getItem('agentProjects') || '[]');
    projects.push(project);
    localStorage.setItem('agentProjects', JSON.stringify(projects));
    
    closeModal();
    showNotification('Project added successfully!', 'success');
    loadProjects();
    loadStatistics();
}

function viewProject(projectId) {
    showNotification('View project details coming soon!', 'info');
}

function editProject(projectId) {
    showNotification('Edit project coming soon!', 'info');
}

function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    let projects = JSON.parse(localStorage.getItem('agentProjects') || '[]');
    projects = projects.filter(p => p.id !== projectId);
    localStorage.setItem('agentProjects', JSON.stringify(projects));
    
    showNotification('Project deleted successfully', 'success');
    loadProjects();
    loadStatistics();
}

function showLeads() {
    showNotification('Leads management coming soon!', 'info');
}

function contactClient(projectId) {
    showNotification('Contact functionality coming soon!', 'info');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#e74c3c' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
