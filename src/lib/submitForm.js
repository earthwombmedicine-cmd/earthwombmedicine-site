import { supabase } from './supabaseClient';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqedvvye';

/**
 * Dual-submit: Formspree (email alert) + Supabase (database record)
 * @param {string} tableName - Supabase table to insert into
 * @param {object} data - Form data object with all fields
 * @returns {object} { success: boolean, error: string|null }
 */
export const submitForm = async (tableName, data) => {
  try {
    // 1. Send to Formspree: triggers immediate email to Shama
    const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        _subject: `New lead from Earth Womb Medicine: ${data.name || 'Unknown'}`,
        _source: tableName,
      }),
    });

    if (!formspreeRes.ok) {
      const formspreeError = await formspreeRes.json();
      console.error('Formspree error:', formspreeError);
      // Don't block: still try Supabase even if Formspree fails
    }

    // 2. Save to Supabase: persistent database record
    const { error: supabaseError } = await supabase
      .from(tableName)
      .insert([{
        ...data,
        source: document.referrer || 'direct',
        created_at: new Date().toISOString(),
      }]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Formspree already sent, so at minimum email was delivered
      return { 
        success: true, 
        warning: 'Form submitted but database save failed. Email notification was sent.',
        error: supabaseError.message 
      };
    }

    return { success: true, error: null };

  } catch (err) {
    console.error('Form submission error:', err);
    return { success: false, error: err.message };
  }
};
