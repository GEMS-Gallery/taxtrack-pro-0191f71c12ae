import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const addTaxPayerForm = document.getElementById('addTaxPayerForm');
    const searchButton = document.getElementById('searchButton');
    const refreshButton = document.getElementById('refreshButton');

    addTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        try {
            await backend.addTaxPayer(tid, firstName, lastName, address);
            alert('TaxPayer added successfully');
            addTaxPayerForm.reset();
            displayAllTaxPayers();
        } catch (error) {
            console.error('Error adding taxpayer:', error);
            alert('Failed to add taxpayer');
        }
    });

    searchButton.addEventListener('click', async () => {
        const searchTID = document.getElementById('searchTID').value;
        const searchResult = document.getElementById('searchResult');

        try {
            const result = await backend.getTaxPayer(searchTID);
            if (result.length > 0) {
                const taxpayer = result[0];
                searchResult.innerHTML = `
                    <h3>Search Result:</h3>
                    <p>TID: ${taxpayer.TID}</p>
                    <p>Name: ${taxpayer.firstName} ${taxpayer.lastName}</p>
                    <p>Address: ${taxpayer.address}</p>
                `;
            } else {
                searchResult.innerHTML = '<p>No taxpayer found with this TID.</p>';
            }
        } catch (error) {
            console.error('Error searching for taxpayer:', error);
            searchResult.innerHTML = '<p>Error searching for taxpayer.</p>';
        }
    });

    refreshButton.addEventListener('click', displayAllTaxPayers);

    async function displayAllTaxPayers() {
        const taxpayerList = document.getElementById('taxpayerList');
        try {
            const allTaxPayers = await backend.getAllTaxPayers();
            taxpayerList.innerHTML = '<h3>All TaxPayers:</h3>';
            allTaxPayers.forEach(taxpayer => {
                taxpayerList.innerHTML += `
                    <div>
                        <p>TID: ${taxpayer.TID}</p>
                        <p>Name: ${taxpayer.firstName} ${taxpayer.lastName}</p>
                        <p>Address: ${taxpayer.address}</p>
                        <hr>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching all taxpayers:', error);
            taxpayerList.innerHTML = '<p>Error fetching taxpayer list.</p>';
        }
    }

    // Initial display of all taxpayers
    displayAllTaxPayers();
});