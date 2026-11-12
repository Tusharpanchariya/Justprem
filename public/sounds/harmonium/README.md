# Harmonium sample library

The `recorded` folder contains 38 compressed, recorded harmonium notes in the C2–C5 range. They are lazy-loaded by the €108 course player on first playback. Notes within this range are recorded at each chromatic pitch; the player limits nearest-sample pitch shifting to five semitones for other notes.

## Attribution and license

Original recording: Donya Quick, “Harmonium Samples – All Keys and Drones,” recorded at Yale University's Euterpea Studio and published on Freesound. Edited samples are from Nicholaus P. Brosowsky's `tonejs-instruments` harmonium set. The source repository identifies its samples as CC BY 3.0. Attribution is displayed next to the player. Source: https://github.com/nbrosowsky/tonejs-instruments

The recordings are not identified by reed count or register, so the player offers them as a general recorded harmonium sound only. Single reed, double reed, triple reed, bass, and treble configurations remain unavailable until separately licensed and labeled recordings are supplied.

To add a configuration, place authentic audio in its matching folder, confirm the license permits web playback and distribution, map scientific-pitch note names to existing asset URLs in `src/components/course/HarmoniumSampleManager.ts`, and add the complete attribution. Do not label a reed configuration unless the source recording identifies it.
