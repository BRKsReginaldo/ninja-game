import { get, set } from 'lodash';
import { DEFAULT_PREFERENCES } from '../constants';

let preferences;

export const getPreference = key => {
	if (!preferences) {
		// const storedPreferences = localStorage.getItem(STORAGE.PREFERENCES);
		// preferences = storedPreferences
		//   ? JSON.parse(storedPreferences)
		//   : DEFAULT_PREFERENCES;
		preferences = DEFAULT_PREFERENCES;
	}

	return get(preferences, key);
};

export const setPreference = (key, value) => {
	getPreference('dummy'); // just to set the preferences object if not yet done

	set(preferences, key, value);

	// localStorage.setItem(STORAGE.PREFERENCES, JSON.stringify(preferences));
};
