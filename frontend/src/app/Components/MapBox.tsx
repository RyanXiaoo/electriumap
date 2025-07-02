"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type MapBoxProps = {
  width?: string;
  height?: string;
  onPinDrop?: (lat: number, lng:number) => void;
};

const MapBox = ({ width = "100vw", height = "100vh", onPinDrop}: MapBoxProps) => {
  // Store marker references outside useEffect
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  //controls whether pin drop overlay is showing
  //const [showPinOverlay, setPinOverlay] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40],
        zoom: 9,
        style: "mapbox://styles/hannahwiens/cmcj9t5wf000v01p6chg0e07a",
      });

      // Add click event to drop a pin and log coordinates
      mapRef.current.on("click", (e: mapboxgl.MapMouseEvent) => {
        const { lng, lat } = e.lngLat;
        // Create a marker
        const marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);
        // Add to marker refs
        markersRef.current.push(marker);
        // Add click event to remove marker
        marker.getElement().addEventListener("click", function (ev) {
          ev.stopPropagation(); // Prevent map click event
          marker.remove();
          // Remove from marker refs
          markersRef.current = markersRef.current.filter((m) => m !== marker);
        });
        // Log coordinates
        console.log("Dropped pin at:", { lng, lat });

        //Shows white overlay when pin is dropped
        //setPinOverlay(true);
        onPinDrop?.(lat, lng);
      });
    }

    return () => {
      // Remove all markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
    };
  }, []);

  return (
    <>
      <div
        style={{ width, height }}
        ref={mapContainerRef}
        className="map-container"
      />
    </>
  );
};

export default MapBox;
