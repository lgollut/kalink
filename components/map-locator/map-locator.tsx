'use client';

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { ForwardedRef, forwardRef } from 'react';

import { vars } from '@/styles/contract.css';

type MapLocatorProps = {
  apiKey?: string;
  mapId?: string;
};

const MapLocator = (
  { apiKey, mapId }: MapLocatorProps,
  ref: ForwardedRef<any>,
) => {
  if (!apiKey || !mapId) {
    return null;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultZoom={16}
        mapId={mapId}
        defaultCenter={{ lat: 46.51401398768072, lng: 6.842526934453779 }}
        disableDefaultUI
      >
        <AdvancedMarker
          position={{ lat: 46.51401398768072, lng: 6.842526934453779 }}
        >
          <Pin
            background={vars.system.color.primary}
            glyphColor={vars.system.color.onPrimary}
            borderColor={vars.system.color.onPrimary}
          />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
};

const WrappedMapLocator = forwardRef(MapLocator);

export { WrappedMapLocator as MapLocator };
