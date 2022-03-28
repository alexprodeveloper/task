export default new class SuggestService {
    async get(query) {
        const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + '0f9f64bbbbb5415302fe83b5afe48d00f244d6f9',
            },
            body: JSON.stringify({query: query}),
        });
        return response.json();
    }
}