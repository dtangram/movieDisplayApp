import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import axios from 'axios';
import './styles.module.css';
import logo from '../images/logo.svg';

const App = () => {
	const [movies, setMovieValue] = useState([]);
	const [moviesID, setMovieValueID] = useState([]);
	const [moviesQuery, setMovieQueryValue] = useState('');
	const [showModal, setShowModal] = useState(false);
	const api_key = process.env.REACT_APP_MOVIE_DB_API_KEY;
	const domain = process.env.REACT_APP_API_DOMAIN;
	const imageURL = process.env.REACT_APP_API_BASE_IMAGE_URL;

	const handleChange = (event) => {
		event.preventDefault();

		setMovieQueryValue(event.target.value);

		axios.get(`${domain}/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${moviesQuery}`)
		 .then((res) => {
			 setMovieValue(res.data.results);
			})
	};

	useEffect(() => {
		const api_key = process.env.REACT_APP_MOVIE_DB_API_KEY;
		const domain = process.env.REACT_APP_API_DOMAIN;

		const movieDisplay = async () => {
			await axios.get(`${domain}/movie/now_playing?api_key=${api_key}`)
	 		 .then((res) => {
	 			 setMovieValue(res.data.results);
	 			})
		};
		movieDisplay();
	}, []);

	const movieDisplayID = async (id) => {
		if (id) {
			await axios.get(`${domain}/movie/${id}?api_key=${api_key}`)
			 .then((res) => {
				 setMovieValueID(res.data)
				 console.log('DATA: ', res.data);
				})
		}
	};
	movieDisplayID();

	const closeModal = () => setShowModal(false);

	return (
		<React.Fragment>
			<main>
				<section>
					<figure><img src={logo} alt="Timescale" /></figure>
					<input type="text" value={moviesQuery} onChange={handleChange} placeholder="Search" />
				</section>

				<hr />

				<h1>Most Recent Movies</h1>

				<section>
					{movies.length > 0 && movies.map(movieItems => (
						<article key={movieItems.id}>
							<section>
								<figure>
									<span>{movieItems.vote_average}</span>
									<img
										src={`${imageURL}/${movieItems.poster_path}`}
										alt={`${movieItems.title}`}
										onClick={() => {setShowModal(true); movieDisplayID(movieItems.id)}}
									/>

									<p>{movieItems.title}</p>
								</figure>
							</section>
						</article>
					))}
				</section>
			</main>

			{
				// MODAL
			}

			<Modal
				showModal={showModal}
				closeModal={closeModal}
				imageURL={imageURL}
				moviesID={moviesID}
			/>
		</React.Fragment>
	);
};

export default App;
