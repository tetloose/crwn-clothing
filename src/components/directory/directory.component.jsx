import CategoryItem from '../category-item/category-item.component';

import './directory.styles.scss';

const Directory = ({categories}, returnRef) => (
  <div className='directory-container'>
    {categories.map((category, categoryIndex) => (
      <CategoryItem
        key={category.id}
        category={category}
      />
    ))}
  </div>
)

export default Directory;
