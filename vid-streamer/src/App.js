import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const App = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startPosition: -1,
        debug: false,
        capLevelOnFPSDrop: false,
        capLevelToPlayerSize: false,
        defaultAudioCodec: undefined,
        initialLiveManifestSize: 1,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        backBufferLength: Infinity,
        frontBufferFlushThreshold: Infinity,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
        highBufferWatchdogPeriod: 2,
        nudgeOffset: 0.1,
        nudgeMaxRetry: 3,
        maxFragLookUpTolerance: 0.25,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: Infinity,
        liveDurationInfinity: false,
        preferManagedMediaSource: false,
        enableWorker: true,
        enableSoftwareAES: true,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 1,
        manifestLoadingRetryDelay: 1000,
        manifestLoadingMaxRetryTimeout: 64000,
        startLevel: undefined,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 1000,
        levelLoadingMaxRetryTimeout: 64000,
        fragLoadingTimeOut: 20000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1000,
        fragLoadingMaxRetryTimeout: 64000,
        startFragPrefetch: false,
        testBandwidth: true,
        progressive: false,
        lowLatencyMode: true,
        fpsDroppedMonitoringPeriod: 5000,
        fpsDroppedMonitoringThreshold: 0.2,
        appendErrorMaxRetry: 3,
        enableDateRangeMetadataCues: true,
        enableEmsgMetadataCues: true,
        enableID3MetadataCues: true,
        enableWebVTT: true,
        enableIMSC1: true,
        enableCEA708Captions: true,
        stretchShortVideoTrack: false,
        maxAudioFramesDrift: 1,
        forceKeyFrameOnDiscontinuity: true,
        abrEwmaFastLive: 3.0,
        abrEwmaSlowLive: 9.0,
        abrEwmaFastVoD: 3.0,
        abrEwmaSlowVoD: 9.0,
        abrEwmaDefaultEstimate: 500000,
        abrEwmaDefaultEstimateMax: 5000000,
        abrBandWidthFactor: 0.95,
        abrBandWidthUpFactor: 0.7,
        abrMaxWithRealBitrate: false,
        maxStarvationDelay: 4,
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        emeEnabled: false,
        licenseXhrSetup: undefined,
        drmSystems: {},
        drmSystemOptions: {},
        cmcd: undefined,
      });
      hls.loadSource('/stream.m3u8');
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = '/stream.m3u8';
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} controls width="50%" height="auto">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};


export default App;

