import './style.css';
import { movies } from '../modules/utils.js';
import likingAMovie from '../modules/liking_a_Movie.js';

const body = document.querySelector('body');
movies();
body.addEventListener('click', likingAMovie);