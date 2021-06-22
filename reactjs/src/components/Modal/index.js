import React from 'react';
import styles from './styles.module.css';

export const Modal = ({ showModal, closeModal, imageURL, moviesID }) => {
	return (
		<React.Fragment>
      {
        // MODAL
      }

      <section
        className={styles.modal}
        onClick={closeModal}
        style={{
					display: showModal ? "block" : "none",
					opacity: showModal ? "1" : "0"
        }}
      >
        <article>
					<section className={styles.headerWrap}>
						<h2>{moviesID.title}</h2>
						<span>&#9746;</span>
					</section>

					<section className={styles.copyWrap}>
						<article>
							<figure>
								<img src={`${imageURL}/${moviesID.poster_path}`} alt={`${moviesID.title}`} />
							</figure>
						</article>

						<article>
							<p><span>Release date:</span> {moviesID.release_date}</p>

							<p>{moviesID.overview}</p>

							<p><span>{moviesID.vote_average}</span> / 10 {moviesID.vote_count}</p>
						</article>
					</section>
        </article>
      </section>
		</React.Fragment>
	)
};
