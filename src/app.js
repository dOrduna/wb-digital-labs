import { JsonPlaceholderService } from "./api/json-placeholder-service";
const jsonPlaceholderService = new JsonPlaceholderService();

export const run = () => {
 jsonPlaceholderService.fetchAlbums(renderAlbums);
};


const renderAlbums = (albums) => {
    alert(albums.length);
};