
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/productService";
import ProductDetail from "@/components/product/product-details/ProductDetail";


export async function generateMetadata({ params }) {
  // ✅ params is a Promise in your Next version
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }

  return {
    title: `${product.name} | Buy at Best Price`,
    description: product.description,
    keywords: [
      product.name,
      product.brand,
      product.category?.name,
      product.subcategory?.name,
    ]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}


export default async function ProductBySlugPage({ params }) {
  // ✅ params is a Promise in your Next version
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

 

  return (
  <ProductDetail product={product}></ProductDetail>
  );
}

