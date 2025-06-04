let allPets = [];

document.addEventListener('DOMContentLoaded', () => {
  // Load JSON data
  fetch('data/breeds.json')
    .then(res => res.json())
    .then(data => {
      allPets = data;
      applyFilters();
    })
    .catch(err => console.error('Failed to load breeds.json', err));

  // Event listeners for search and filter buttons
  document.getElementById('search').addEventListener('input', applyFilters);
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      applyFilters();
    });
  });
});

function applyFilters() {
  const urlParams = new URLSearchParams(window.location.search);
  const typeFilter = urlParams.get('type');
  const textFilter = document.getElementById('search').value.toLowerCase();
  const availableBtn = document.querySelector('.filter[data-available]');
  const availability = availableBtn ? availableBtn.classList.contains('active') : false;

  let filtered = allPets;
  // Filter by type from index.html
  if (typeFilter) {
    filtered = filtered.filter(pet => pet.type.toLowerCase() === typeFilter);
  }
  // Filter by search text
  if (textFilter) {
    filtered = filtered.filter(pet => pet.name.toLowerCase().includes(textFilter));
  }
  // Filter by availability
  if (availability) {
    filtered = filtered.filter(pet => pet.available);
  }

  renderCards(filtered);
}

function renderCards(pets) {
  const container = document.getElementById('pet-list');
  container.innerHTML = '';
  pets.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
      <img src="images/${pet.image}" alt="${pet.name}" class="pet-img" />
      <h3>${pet.name}</h3>
      <p>${pet.traits.join(', ')}</p>
      <p><small>${pet.size} • ${pet.origin}</small></p>
    `;
    card.style.backgroundColor = pet.type === 'Dog' ? '#b3d9ff' : '#f9c5d1';
    card.style.position = 'relative';
    container.appendChild(card);
  });
}