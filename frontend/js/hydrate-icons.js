/**
 * Replaces every [data-rune] placeholder in the page with its inline
 * Rune icon. Loaded as a module on pages that use data-rune in markup.
 */
import { hydrateRuneIcons } from './icons.js';

hydrateRuneIcons();
