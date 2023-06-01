import './style.css';
import { movies } from '../modules/utils.js';
import liking_a_Movie from '../modules/liking_a_Movie.js';

const body = document.querySelector('body');
movies();
body.addEventListener('click', liking_a_Movie);