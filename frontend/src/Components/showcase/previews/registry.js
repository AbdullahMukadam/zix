// Import all preview components here
import SpotlightCard from './SpotlightCard.jsx';
import MagneticButton from './MagneticButton.jsx';
import GradientBorderButton from './GradientBorderButton.jsx';
import Handlebars from './Handlebars.jsx';

// Map IDs from components.js to the actual component
const previewRegistry = {
  'spotlight-card': SpotlightCard,
  'magnetic-button': MagneticButton,
  'gradient-border-button': GradientBorderButton,
  'handlebars': Handlebars,
  
  // You can map other components here as you build them
  // For now, if a component doesn't have a preview, it will fallback to the default text
};

export default previewRegistry;
