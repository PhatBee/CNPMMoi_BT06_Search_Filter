import React, { useRef, useEffect } from 'react';
import useProducts from '../hook/useProducts';
import ProductList from '../components/ProductList';

export default function AllProducts() {
  // default category 'all', limit 12
  const { products, loading, error, hasMore, loadMore, changeCategory, currentCategory } = useProducts('all', 12);

  const loaderRef = useRef(null);

  // IntersectionObserver setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  return (
    <div>
      <h2>Tất cả sản phẩm</h2>

      {/* example category selector */}
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => changeCategory('all')} disabled={currentCategory === 'all'}>Tất cả</button>
        <button onClick={() => changeCategory('skincare')} disabled={currentCategory === 'skincare'}>Skincare</button>
        <button onClick={() => changeCategory('makeup')} disabled={currentCategory === 'makeup'}>Makeup</button>
      </div>

      <ProductList products={products} />

      {/* loader sentinel */}
      <div ref={loaderRef} style={{ height: 1 }} />

      {loading && <div>Loading...</div>}
      {error && <div>Có lỗi xảy ra</div>}
      {!hasMore && <div>Đã tải hết sản phẩm</div>}
    </div>
  );
}
