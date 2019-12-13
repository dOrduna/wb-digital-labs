export class JsonPlaceholderService {

    fetchResource(resourceName, callback) {
        fetch(`https://jsonplaceholder.typicode.com/${resourceName}`)
            .then(response => response.json())
            .then(json => callback(json));
    }
    
    fetchAlbums(callback) {
        this.fetchResource('albums', callback);
    }
}
