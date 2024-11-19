

document.getElementById('loadProductsButton').addEventListener('click', function() {
    fetch('/api/products')
      .then(response => {
        if (!response.ok){
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(products => {
        const tbody = document.getElementById('productTableBody');
        tbody.innerHTML = '';
  
        products.forEach((product, index) => {
          const tr = document.createElement('tr');
          tr.className = index % 2 === 0 ? 'bg-gray-100' : 'bg-white';
          tr.innerHTML = `
            <td class="p-3 border border-gray-300">${product.name}</td>
            <td class="p-3 border border-gray-300">${product.sku}</td>
            <td class="p-3 border border-gray-300">${product.price}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Fel vid hämtning', error);
      });
  });
  