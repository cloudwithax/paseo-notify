# Paseo Notifications

A tiny home-screen web app that receives Paseo agent notifications (finished, error,
needs permission) on iPhone via standard Web Push. Pushes are sent by the `native-push`
daemon plugin; setup starts in the Paseo native app under Settings → Notifications.

Static files only. The per-host VAPID public key and device id arrive in the setup link.
