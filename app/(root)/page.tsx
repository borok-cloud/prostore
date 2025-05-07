import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';
//import sampleData from '@/db/sample-data';
//const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//const Homepage = async () => {
  //await delay(1000);
const Homepage = async () => {  
  console.log('Fetching latest products...');
  const latestProducts = await getLatestProducts();
  console.log('Latest Products:', latestProducts);
  return ( 
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList title="Newest Arrivals" data={latestProducts} />
    </div> 
  );
}
 
export default Homepage;