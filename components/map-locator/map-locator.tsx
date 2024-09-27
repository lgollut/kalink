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
    </Box>
  );
};

const WrappedMapLocator = forwardRef(MapLocator);

export { WrappedMapLocator as MapLocator };
