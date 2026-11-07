package com.example.Laptops.service;

import java.nio.charset.StandardCharsets;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

/** Neutral picture returned when a laptop has no image yet, so browsers never log a 404. */
public final class ImagePlaceholder {

    private static final byte[] SVG = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"320\" height=\"200\" viewBox=\"0 0 320 200\">"
            + "<rect width=\"320\" height=\"200\" fill=\"#f1f3f7\"/>"
            + "<rect x=\"110\" y=\"62\" width=\"100\" height=\"66\" rx=\"5\" fill=\"none\" stroke=\"#c8c8c4\" stroke-width=\"4\"/>"
            + "<rect x=\"90\" y=\"134\" width=\"140\" height=\"8\" rx=\"4\" fill=\"#c8c8c4\"/>"
            + "<text x=\"160\" y=\"170\" text-anchor=\"middle\" fill=\"#878480\" font-size=\"13\" font-family=\"sans-serif\">Aucune image</text>"
            + "</svg>").getBytes(StandardCharsets.UTF_8);

    private ImagePlaceholder() {
    }

    public static ResponseEntity<byte[]> response() {
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("image/svg+xml"))
                .cacheControl(CacheControl.noCache())
                .body(SVG);
    }
}
