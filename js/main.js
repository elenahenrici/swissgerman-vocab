/**
 * Entry point of the app.
 * Loads the word list from data/words.json and shows it as a simple list.
 */

const DATA_URL = "data/words.json";

/**
 * Loads the JSON file with categories and words.
 * @returns {Promise<{categories: Array, words: Array}>}
 */
const loadData = async () => {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
        throw new Error(`Could not load ${DATA_URL} (status ${response.status})`);
    }
    return response.json();
};

/**
 * Creates one list item for a word.
 * @param {{swissGerman: string, translation: string}} word
 * @returns {HTMLLIElement}
 */
const createWordItem = word => {
    const item = document.createElement("li");

    const swissGerman = document.createElement("strong");
    swissGerman.textContent = word.swissGerman;

    const translation = document.createElement("span");
    translation.textContent = ` ${word.translation}`;

    item.append(swissGerman, translation);
    return item;
};

/**
 * Shows all words in the list element.
 * @param {HTMLUListElement} listElement
 * @param {Array} words
 */
const renderWords = (listElement, words) => {
    listElement.replaceChildren(...words.map(createWordItem));
};

const start = async () => {
    const listElement = document.getElementById("word-list");
    try {
        const data = await loadData();
        renderWords(listElement, data.words);
    } catch (error) {
        listElement.textContent = "The word list could not be loaded.";
        console.error(error);
    }
};

start();
