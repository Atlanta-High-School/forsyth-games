'use client'

import { useEffect } from 'react'

/**
 * WebRTC Blocker Component
 * Disables WebRTC functionality to prevent monitoring services like
 * Linewize, Classwize, and other school monitoring tools from using
 * live screen sharing/monitoring features.
 * 
 * Blocks Xirsys TURN/STUN servers used by Classwize Live View
 * Updated: December 20, 2025
 */

// Xirsys IP addresses to block (used by Classwize for WebRTC signaling)
const XIRSYS_BLOCKED_IPS = {
  'US West (ws.xirsys.com)': [
    '104.248.215.23', '104.248.215.39', '104.248.215.47', 
    '104.248.215.54', '159.65.109.225'
  ],
  'US East (us.xirsys.com)': [
    '167.71.190.245', '167.172.255.29', '157.245.114.91', 
    '165.22.45.228', '104.248.6.243', '159.89.177.112',
    '167.172.16.110', '142.93.184.130', '45.55.60.16', 
    '45.55.53.234', '68.183.115.118', '142.93.69.39',
    '159.203.72.38', '159.203.79.110', '198.199.81.26', '64.225.24.155'
  ],
  'Europe (es.xirsys.com)': [
    '104.248.25.109', '104.248.254.251', '104.248.246.230', 
    '159.89.29.122', '159.89.29.128', '159.89.29.206',
    '178.128.172.237', '206.189.115.214'
  ],
  'Bangalore (bs.xirsys.com)': [
    '167.71.229.96', '134.209.150.51', '134.209.159.89', '159.89.161.7'
  ],
  'Tokyo (tk.xirsys.com)': [
    '35.72.248.178', '54.64.237.21', '54.150.43.129', 
    '52.69.98.97', '3.115.202.185'
  ],
  'Hong Kong (hk.xirsys.com)': [
    '8.210.215.149', '8.217.237.52', '47.242.147.103', '47.242.109.143'
  ],
  'Singapore (ss.xirsys.com)': [
    '206.189.91.198', '178.128.218.96', '178.128.23.119', '178.128.19.180'
  ],
  'Sydney (ms.xirsys.com)': [
    '3.24.119.117', '54.66.64.157', '3.105.54.211', 
    '3.104.157.207', '13.236.79.251'
  ],
  'Brazil (sp.xirsys.com)': [
    '181.215.183.204', '181.215.183.94', '191.96.71.232', 
    '154.16.57.106', '191.96.70.169'
  ],
  'Toronto (to.xirsys.com)': [
    '159.203.41.247', '138.197.137.92', '138.197.139.250', 
    '138.197.167.11', '165.227.34.77'
  ],
  'Johannesburg (jb.xirsys.com)': [
    '154.127.57.220', '154.16.63.120', '154.16.63.252'
  ],
  'Frankfurt (fr.xirsys.com)': [
    '138.197.176.47', '167.172.162.40', '207.154.253.27', 
    '104.248.242.8', '206.81.27.103', '167.99.135.63',
    '159.89.16.108', '157.230.116.158', '207.154.234.214'
  ]
}

// Flatten all IPs into a single array for checking
const ALL_BLOCKED_IPS = Object.values(XIRSYS_BLOCKED_IPS).flat()

// Monitoring service domains to block
const BLOCKED_DOMAINS = [
  // WebRTC signaling servers
  'ably.io',
  'ably-realtime.com', 
  'xirsys.com',
  // Classwize Screen Share (Stream.io services)
  'stream-io-api.com',
  'stream-io-video.com',
  'stream-io-cdn.com',
  'getstream.io',
  // Qoria monitoring platform
  'qoria.cloud',
  'qoria-api.cloud',
  'qoriaapis.cloud',
  // Monitoring/filtering services
  'linewize.com',
  'classwize.com',
  'smoothwall.com',
  'smoothwall.cloud',
  'familyzone.com',
  'securly.com',
  'goguardian.com'
]

export default function WebRTCBlocker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Override fetch to block monitoring service domains and IPs
    const originalFetch = window.fetch
    window.fetch = function(...args) {
      const url = args[0]?.toString() || ''
      
      // Check if URL contains blocked domain
      const isBlockedDomain = BLOCKED_DOMAINS.some(domain => url.includes(domain))
      
      // Check if URL contains blocked IP
      const isBlockedIP = ALL_BLOCKED_IPS.some(ip => url.includes(ip))
      
      if (isBlockedDomain || isBlockedIP) {
        console.warn('🛡️ Blocked request to monitoring service:', url)
        return Promise.reject(new Error('Request blocked by WebRTC blocker'))
      }
      
      return originalFetch.apply(this, args)
    }

    // Override WebSocket to block monitoring services
    const OriginalWebSocket = window.WebSocket
    // @ts-expect-error - Overriding native WebSocket
    window.WebSocket = function(url: string, protocols?: string | string[]) {
      const urlStr = url.toString()
      
      // Check if URL contains blocked domain or IP
      const isBlocked = BLOCKED_DOMAINS.some(domain => urlStr.includes(domain)) ||
                       ALL_BLOCKED_IPS.some(ip => urlStr.includes(ip))
      
      if (isBlocked) {
        console.warn('🛡️ Blocked WebSocket to monitoring service:', urlStr)
        throw new Error('WebSocket blocked by WebRTC blocker')
      }
      
      return new OriginalWebSocket(url, protocols)
    }

    // Disable RTCPeerConnection (core WebRTC API) - PRIMARY BLOCKER for low-latency media
    const DisabledRTCPeerConnection = function(config?: RTCConfiguration) {
      console.warn('🛡️ RTCPeerConnection blocked - Classwize Live View prevented')
      console.warn('Attempted config:', config)
      throw new DOMException(
        'RTCPeerConnection is disabled on this site to prevent unauthorized screen monitoring',
        'NotSupportedError'
      )
    }
    
    if (window.RTCPeerConnection) {
      // @ts-expect-error - Overriding native API
      window.RTCPeerConnection = DisabledRTCPeerConnection
    }

    // Disable legacy webkitRTCPeerConnection
    if ((window as Window & { webkitRTCPeerConnection?: unknown }).webkitRTCPeerConnection) {
      (window as Window & { webkitRTCPeerConnection?: unknown }).webkitRTCPeerConnection = DisabledRTCPeerConnection as unknown
    }

    // Disable mozRTCPeerConnection (Firefox)
    if ((window as Window & { mozRTCPeerConnection?: unknown }).mozRTCPeerConnection) {
      (window as Window & { mozRTCPeerConnection?: unknown }).mozRTCPeerConnection = DisabledRTCPeerConnection as unknown
    }

    // Block RTCDataChannel
    if ((window as Window & { RTCDataChannel?: unknown }).RTCDataChannel) {
      (window as Window & { RTCDataChannel?: unknown }).RTCDataChannel = function() {
        console.warn('🛡️ RTCDataChannel blocked')
        throw new Error('RTCDataChannel is disabled')
      } as unknown
    }

    // Block RTCSessionDescription
    if ((window as Window & { RTCSessionDescription?: unknown }).RTCSessionDescription) {
      (window as Window & { RTCSessionDescription?: unknown }).RTCSessionDescription = function() {
        console.warn('🛡️ RTCSessionDescription blocked')
        throw new Error('RTCSessionDescription is disabled')
      } as unknown
    }

    // Block RTCIceCandidate (prevents WebRTC connection establishment)
    if ((window as Window & { RTCIceCandidate?: unknown }).RTCIceCandidate) {
      (window as Window & { RTCIceCandidate?: unknown }).RTCIceCandidate = function() {
        console.warn('🛡️ RTCIceCandidate blocked')
        throw new Error('RTCIceCandidate is disabled')
      } as unknown
    }

    // Disable getUserMedia (used for camera/microphone access)
    const blockedGetUserMedia = function() {
      console.warn('🛡️ getUserMedia blocked - Camera/microphone access denied')
      return Promise.reject(new DOMException(
        'getUserMedia is not available on this site',
        'NotAllowedError'
      ))
    }
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia = blockedGetUserMedia
    }

    // Disable legacy getUserMedia
    if ((navigator as Navigator & { getUserMedia?: unknown }).getUserMedia) {
      (navigator as Navigator & { getUserMedia?: unknown }).getUserMedia = function() {
        console.warn('🛡️ Legacy getUserMedia blocked')
        throw new DOMException('getUserMedia is disabled', 'NotAllowedError')
      }
    }

    if ((navigator as Navigator & { webkitGetUserMedia?: unknown }).webkitGetUserMedia) {
      (navigator as Navigator & { webkitGetUserMedia?: unknown }).webkitGetUserMedia = blockedGetUserMedia
    }

    if ((navigator as Navigator & { mozGetUserMedia?: unknown }).mozGetUserMedia) {
      (navigator as Navigator & { mozGetUserMedia?: unknown }).mozGetUserMedia = blockedGetUserMedia
    }

    // CRITICAL: Disable getDisplayMedia (screen sharing) - MAIN BLOCKER for Live View
    const blockedGetDisplayMedia = function() {
      console.warn('🛡️🛡️🛡️ getDisplayMedia BLOCKED - Screen capture prevented!')
      console.warn('This blocks Classwize Live View low-latency streaming')
      return Promise.reject(new DOMException(
        'Screen capture is disabled on this site to prevent unauthorized monitoring',
        'NotAllowedError'
      ))
    }
    
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia = blockedGetDisplayMedia
    }

    // Also block the legacy getDisplayMedia if it exists
    if ((navigator as Navigator & { getDisplayMedia?: unknown }).getDisplayMedia) {
      (navigator as Navigator & { getDisplayMedia?: unknown }).getDisplayMedia = blockedGetDisplayMedia
    }

    // Block enumerateDevices to prevent device detection
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices = function() {
        console.warn('🛡️ enumerateDevices blocked')
        return Promise.resolve([])
      }
    }

    // Log successful initialization
    console.log('🛡️ WebRTC Blocker Active - TRUE WebRTC DISABLED')
    console.log(`✓ Blocked ${ALL_BLOCKED_IPS.length} Xirsys IP addresses`)
    console.log(`✓ Blocked ${BLOCKED_DOMAINS.length} monitoring domains`)
    console.log('✓ RTCPeerConnection DISABLED (all variants)')
    console.log('✓ getDisplayMedia DISABLED (screen capture blocked)')
    console.log('✓ getUserMedia DISABLED (camera/mic blocked)')
    console.log('✓ RTCDataChannel, RTCIceCandidate, RTCSessionDescription DISABLED')
    console.log('✓ True WebRTC (getDisplayMedia + RTCPeerConnection) completely blocked')
    console.log('🛡️ Classwize Live View low-latency streaming should be PREVENTED')

    // Cleanup function
    return () => {
      window.fetch = originalFetch
      window.WebSocket = OriginalWebSocket
    }
  }, [])

  return null // This component doesn't render anything
}
