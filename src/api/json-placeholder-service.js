import photos from '../test-data/photos.json';

export class JsonPlaceholderService {

  fetchResource(resourceName, callback) {
    fetch(`https://jsonplaceholder.typicode.com/${resourceName}`)
      .then(response => response.json())
      .then(json => callback(json));
  }

  fetchPhotos(callback) {
    this.fetchResource("photos", callback);
  }

  fetchTestPhotos(callback) {
    callback(photos);
  }
}
