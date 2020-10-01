export default function appSettings() {
  return {
    csvSource: `${process.env.CSV_PATH}` || 'test.csv',
  };
}
