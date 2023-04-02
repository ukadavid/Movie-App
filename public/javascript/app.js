function setUpdateModalFields(movie) {
    let updateModal = document.getElementById("update-movie-modal");
    let form = updateModal.querySelector("form");

    form.querySelector("input[name='title']").value = movie.title;
    form.querySelector("textarea[name='description']").value = movie.description;
    form.querySelector("input[name='price']").value = movie.price;
    form.querySelector("input[name='image']").value = movie.image;

    updateModal.addEventListener('shown.bs.modal', function () {
      form.querySelector("input[name='title']").focus();
    });
  }

  const editIcons = document.querySelectorAll('.edit-icon');
  editIcons.forEach(function(editIcon) {
    editIcon.addEventListener('click', function(event) {
      let movieTitle = event.target.parentNode.parentNode.parentNode.querySelector(".card-title").textContent;
      let movieDescription = event.target.parentNode.parentNode.parentNode.querySelector(".card-text").textContent;
      let moviePrice = event.target.parentNode.parentNode.querySelector("button:nth-child(2)").textContent.slice(1);
      let movieImage = event.target.parentNode.parentNode.parentNode.querySelector(".card-img-top").getAttribute("src");
      let movie = {
        title: movieTitle,
        description: movieDescription,
        price: moviePrice,
        image: movieImage
      };
      setUpdateModalFields(movie);
    });
  });

  const updateModal = document.querySelector('#update-movie-modal');
  const updateButton = updateModal.querySelector('button[type="button"]');
  
  updateButton.addEventListener('click', function() {
    const movieId = updateButton.getAttribute('data-movie-id');
    const titleInput = updateModal.querySelector('input[name="title"]');
    const descriptionInput = updateModal.querySelector('textarea[name="description"]');
    const priceInput = updateModal.querySelector('input[name="price"]');
    const imageInput = updateModal.querySelector('input[name="image"]');
  
    const title = titleInput.value;
    const description = descriptionInput.value;
    const price = priceInput.value;
    const image = imageInput.value;
  
    updateMovie(movieId, title, description, price, image);
  });
  