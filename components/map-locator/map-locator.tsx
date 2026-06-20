'use client';

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
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
    <Box ref={ref} width="full" height="full" position="relative">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={14}
          mapId={mapId}
          defaultCenter={{ lat: 46.518651813171466, lng: 6.828546721793127 }}
          disableDefaultUI
        >
          <AdvancedMarker
            position={{ lat: 46.518651813171466, lng: 6.828546721793127 }}
          >
            <Pin
              background={vars.system.color.primary}
              glyphColor={vars.system.color.onPrimary}
              borderColor={vars.system.color.onPrimary}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </Box>
  );
};

const WrappedMapLocator = forwardRef(MapLocator);

export { WrappedMapLocator as MapLocator };
