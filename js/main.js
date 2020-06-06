
initEvents();
function getData() {
  // const name = $('#name').value;
  // const shortDesc = $('#shortDesc').value;
  // const longDesc = $('#longDesc').value;
  // const country = $('#country').value;
  // const stars = $('#stars').value;
  // const recommandation = $('#reco').value;
  // const location = $('#location').value;
  // const room = $('#room').value;
  // const catering = $('#catering').value;
  // const images = $('#images').value;
  const id = $('#id').value;
  const fittings = $('#fittings').value;

  return data = {
    // name,
    // shortDesc,
    // longDesc,
    // country,
    // stars,
    // recommandation,
    // location,
    // room,
    // catering,
    // images,
    id,
    fittings
  }
}

function initEvents() {
  const button = $('.js-submit-button');

  button.addEventListener('click', () => {
    const data = getData();
    const url = 'http://localhost:3000/api/addHotel';

    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch(err => console.log(err))
  });
}

function $(input) {
    return document.querySelector(input);
}



