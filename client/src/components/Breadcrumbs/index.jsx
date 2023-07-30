import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  currentProductIsLoading,
  currentProduct,
  categoriesavailableFilters,
  isLoadingFilters,
} from '../../redux/selectors';
import { fetchFilters, addCategory } from '../../redux/slices/filtersSlice';
import {
  StyledRouterLink,
  StyledBreadcrumbs,
  StyledSpan,
} from '../../themes/themeBreadcrumbs';

export default function BreadCrumbs() {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(currentProduct);
  const isLoading = useSelector(currentProductIsLoading);
  const isLoadingFilter = useSelector(isLoadingFilters);
  const categories = useSelector(categoriesavailableFilters);
  const path = location.pathname.split('/').filter((crumb) => crumb);
  const crumbs = [];
  let crumbPath = '';
  const [showSeparator, setShowSeparator] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSeparator(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (params.id && product && !categories) {
      dispatch(fetchFilters());
    }
  }, []);

  const separator = showSeparator ? '>' : '/';
  if (location.pathname !== '/') {
    crumbs.push(
      <StyledRouterLink key="home" color="inherit" to="/">
        Home
      </StyledRouterLink>
    );
  }

  path.forEach((crumb, index) => {
    if (crumb) {
      crumbPath += `/${crumb}`;

      const isCurrentPage = location.pathname === crumbPath;
      const isLastCrumb = index === path.length - 1;

      if (isLastCrumb) {
        if (params.id && product) {
          if (isLoading && isLoadingFilter) {
            crumbs.push(
              <StyledSpan key="paramsId" className="loading">
                . . . . . . . . . . .
              </StyledSpan>
            );
          }
          if (categories) {
            let categoriesName;
            let categoriesId;
            categories.forEach((elem) => {
              if (elem.id === product.categories) {
                categoriesId = elem.id;
                categoriesName = elem.name;
              }
            });
            crumbs.push(
              <StyledRouterLink
                key={categoriesName}
                color="inherit"
                onClick={dispatch(addCategory(categoriesId))}
                to="/product">
                {categoriesName}
              </StyledRouterLink>
            );
            crumbs.push(<StyledSpan key="paramsId">{product.name}</StyledSpan>);
          }
        } else {
          const capitalizedStr = crumb.charAt(0).toUpperCase() + crumb.slice(1);
          crumbs.push(
            <StyledSpan key={crumbPath}>{capitalizedStr}</StyledSpan>
          );
        }
      } else if (!isCurrentPage) {
        const capitalizedStr = crumb.charAt(0).toUpperCase() + crumb.slice(1);
        crumbs.push(
          <StyledRouterLink key={crumbPath} color="inherit" to={crumbPath}>
            {capitalizedStr}
          </StyledRouterLink>
        );
      }
    }
  });

  if (
    crumbs.length === 0 ||
    location.pathname === '/login' ||
    location.pathname === '/registration'
  ) {
    return null;
  }

  return (
    <StyledBreadcrumbs separator={separator} aria-label="breadcrumb">
      {crumbs}
    </StyledBreadcrumbs>
  );
}
