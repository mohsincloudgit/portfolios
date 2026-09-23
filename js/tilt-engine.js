/**
 * 3D CARD TILT & SPECULAR FLARE ENGINE
 * Implements mouse-guided perspective tilt & dynamic radial specular flare
 */

(function initTiltEngine() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial specular light flare
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D perspective tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxTilt = 8; // degrees

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Tilt for Hero Avatar Stage
  const avatarStage = document.getElementById('avatarStage') || document.getElementById('hudCard');
  if (avatarStage) {
    avatarStage.addEventListener('mousemove', (e) => {
      const rect = avatarStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      avatarStage.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    avatarStage.addEventListener('mouseleave', () => {
      avatarStage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }
})();
