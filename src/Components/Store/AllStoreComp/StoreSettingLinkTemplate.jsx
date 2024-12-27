import {Link } from 'react-router-dom'
const StoreSettingLinkTemplate = ({icon: Icon , getLinkClasses, isActive,link,text, isCollapsed}) => {
  return (
    <Link to={link}>
    <div className={`${getLinkClasses(link)} mt-3`}>
      <div className="flex items-center gap-2 rounded-md">
       < Icon isActive={isActive} link={link}/>
        {isCollapsed ? "" : text}
      </div>
    </div>
  </Link>
  )
}

export default StoreSettingLinkTemplate;