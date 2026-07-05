export const components = {
  projectCard(project) {
    return `
      <article class="project-card reveal" data-project-id="${project.id}" tabindex="0">
          <div class="project-meta">
              <span>${project.category || ''}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.short_description || ''}</p>
          <div class="tags">
              ${(project.tech_stack || []).map(tech => `<span>${tech}</span>`).join('')}
          </div>
          ${project.github_url ? `<a href="${project.github_url}" class="project-link" target="_blank" rel="noopener noreferrer">View GitHub</a>` : ''}
      </article>
    `;
  },
  
  skillCard(category, skills) {
    return `
      <article class="skill-card reveal">
          <h3>${category}</h3>
          <div class="chip-list">
              ${skills.map(s => `<span>${s.name}</span>`).join('')}
          </div>
      </article>
    `;
  },

  certCard(cert) {
    return `
      <article class="cert-card reveal">
          <div class="cert-image">
              <img src="${cert.certificate_image || ''}" alt="${cert.title}">
              <div class="cert-overlay">
                  <span>${cert.title}</span>
                  <small>${cert.issuer}</small>
              </div>
          </div>
          <div class="cert-content">
              <h3>${cert.title}</h3>
              <p>${cert.issuer}</p>
          </div>
      </article>
    `;
  },

  leadershipCard(item) {
    return `
      <article class="timeline-card leadership-card reveal">
          <div class="timeline-meta">${item.organization}</div>
          <h4>${item.position}</h4>
          <p>${item.description}</p>
          <span class="leadership-badge">${item.end_date ? new Date(item.end_date).getFullYear() : 'Ongoing'}</span>
      </article>
    `;
  },

  eventCard(event) {
    return `
      <article class="timeline-card leadership-card reveal">
          <div class="timeline-meta">${event.organizer || ''}</div>
          <h4>${event.event_name}</h4>
          <p>${event.role}</p>
          <span class="leadership-badge">${new Date(event.date).getFullYear()}</span>
      </article>
    `;
  }
};
