// Process location data
export default function getLocation(data) {
  return {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
  };
}
