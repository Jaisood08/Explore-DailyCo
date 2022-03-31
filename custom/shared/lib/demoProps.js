export default function getDemoProps() {
  return {
    domain: 'j-msmex' || null,
    // Check that both domain and key env vars are set
    isConfigured: true,
    // Manual or automatic track subscriptions
    subscribeToTracksAutomatically: !process.env.MANUAL_TRACK_SUBS,
    // Are we running in demo mode? (automatically creates a short-expiry room)
    demoMode: !!process.env.DAILY_DEMO_MODE,
  };
}
