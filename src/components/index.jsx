/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

// render(() => <App />, document.getElementById('root'));

const container = document.querySelector('.dropdown-selection');
const dropdown = container.querySelector('sl-dropdown');

dropdown.addEventListener('sl-select', event => {
    const selectedItem = event.detail.item;
    console.log(selectedItem.value);
    
    if (selectedItem.value == "char") {
        render(() => <App />, document.getElementById('root'));
    }
});
