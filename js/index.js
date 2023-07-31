'use strict'

try {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          clifford: '#da373d',
        }
      }
    }
  }
} catch (error) {
  console.log('Tailwind configuration error!');
}
