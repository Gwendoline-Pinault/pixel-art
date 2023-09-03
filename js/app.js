const app = {
  inputGridValue: 20,
  inputPixelValue: 15,

  /* Color choices */
  styles: [ 
    'dark',
    'carbon',
    'gray',
    'white',
    'flesh',
    'pink',
    'magenta',
    'red',
    'wine',
    'lila',
    'purple',
    'marine',
    'blue',
    'sky',
    'yellow',
    'orange',
    'brown',
    'apple',
    'green',
    'tree',

  ],

  currentColor: 'dark',
  
  /* 'colorSelection' : Create the selection of colors part */

  colorSelection: function(){
    const colorDiv = document.createElement('div');
    colorDiv.id = 'color-selection';

    for (const color of app.styles){
      const colorElement = document.createElement('div');
      colorElement.classList.add('color', `color--${color}`);
      colorElement.dataset.style = color;
      colorElement.classList.add('color--current');
      colorDiv.append(colorElement); 
    }
    document.body.append(colorDiv);

    const colorElements = document.querySelectorAll('.color');
    colorElements.forEach(function (colorElement){
      colorElement.addEventListener('click', app.handleStyleClick);
    });
  },

  handleStyleClick(event){
    const clickedColor = event.currentTarget;
    const currentColor = document.querySelector('.color--current');
    currentColor.classList.remove('color--current');
    clickedColor.classList.add('color--current');
    app.currentColor = clickedColor.dataset.style;
  },

  /* 'inputGrid' : Create the input for the choice of grid width */
  inputGrid: function(){
    const inputGrid = document.createElement('input');
    inputGrid.className = 'input';
    inputGrid.id = 'grid';
    inputGrid.type = 'number';
    inputGrid.value = '';
    inputGrid.title = 'Largeur de la grille (nombre de carrés)';
    inputGrid.placeholder = 'Taille de la grille';
    const formContainer = document.querySelector('.input-container');
    formContainer.append(inputGrid);

    inputGrid.addEventListener('change', function (event) {
      app.inputGridValue = event.currentTarget.value;
    });
  },

/* 'inputPixel' : Create the input for the choice of pixel width */
  inputPixel: function(){
    const inputPixel = document.createElement('input');
    inputPixel.className = 'input';
    inputPixel.id = 'pixel';
    inputPixel.type = 'number';
    inputPixel.value = '';
    inputPixel.title = 'Largeur du pixel (taille en px)';
    inputPixel.placeholder = 'Taille du pixel';
    const formContainer2 = document.querySelector('.input-container');
    formContainer2.append(inputPixel);

    inputPixel.addEventListener('change', function (event) {
      app.inputPixelValue = event.currentTarget.value;
      console.log(app.inputPixelValue);
    });
  },

  /* 'validationButton' : Create the input for the validation button */
  validationButton: function(){
    const validationButton = document.createElement('button');
    validationButton.className = 'validation-button';
    validationButton.type = 'submit';
    validationButton.textContent = 'Nouvelle grille';
    const formContainer3 = document.querySelector('.button-container');
    formContainer3.append(validationButton);

    validationButton.addEventListener('click', function(event) {
      event.preventDefault();
      app.createPixelGrid(app.inputGridValue);
    });
  },

  reset: function() {
    document.getElementById('pixel-art').innerHTML = '';
  },

  /* 'createPixelGrid' : create a wanted size game grid */
  createPixelGrid: function(){
    app.reset();
    for (let line = 0; line <  app.inputGridValue; line++) {
      const lineElement = document.createElement('div');
      lineElement.className = 'line';
      const divPixelArt = document.getElementById('pixel-art');
      divPixelArt.append(lineElement);

      for (let index = 0; index < app.inputGridValue; index++) { 
        const divElement = document.createElement('div');
        divElement.classList.add('case', 'pixel');
        divElement.style.width = `${app.inputPixelValue}px`;
        divElement.style.height = `${app.inputPixelValue}px`;

        divElement.addEventListener('click', app.handlePixelClick); 

        lineElement.append(divElement);
      }
    }
  }, 

  handlePixelClick(event){
    const clickedPixel = event.currentTarget;
    app.styles.forEach(function (color){
      clickedPixel.classList.remove(`pixel--${color}`);
    });

    clickedPixel.classList.add(`pixel--${app.currentColor}`);  
  },

  init : function(){
    app.colorSelection();
    app.inputGrid();
    app.inputPixel();
    app.validationButton(); 
    app.createPixelGrid();
  }
};

app.init();