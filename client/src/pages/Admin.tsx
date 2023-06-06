import AdminTile from '@/features/admin/adminTile/AdminTile'
import { AdminPaths } from '@/features/admin/adminTile/AdminTile.types'
import Header from '@/shared/components/Header/Header'
import { useTranslations } from '@/shared/hooks/useTranslations'

const Admin = () => {
  const { formatMessage } = useTranslations()

  return (
    <main className='bg-light min-h-[calc(100vh-76px)] flex'>
      <div className='bg-white p-4 rounded-md m-4 min-h-full flex-1'>
        <Header
          title={formatMessage({ id: 'admin.adminPanel' })}
          subtitle={formatMessage({ id: 'admin.selectAction' })}
        />
        <div className='grid grid-cols-4 gap-5 mt-6'>
          <AdminTile
            title={formatMessage({ id: 'admin.workflowPaths' })}
            subtitle={formatMessage({ id: 'admin.createEditManage' })}
            icon={'bx-directions'}
            path={AdminPaths.WORKFLOWS}
          />
          <AdminTile
            title={formatMessage({ id: 'admin.users' })}
            subtitle={formatMessage({ id: 'admin.createEditManage' })}
            icon={'bxs-user-detail'}
            path={AdminPaths.USERS}
          />
          <AdminTile
            title={formatMessage({ id: 'admin.cases' })}
            subtitle={formatMessage({ id: 'admin.createEditManage' })}
            icon={'bx-file'}
            path={AdminPaths.CASES}
          />
          <AdminTile
            title={formatMessage({ id: 'admin.archive' })}
            subtitle={formatMessage({ id: 'admin.manage' })}
            icon={'bx-archive'}
            path={AdminPaths.ARCHIVE}
          />
          <AdminTile
            title={formatMessage({ id: 'admin.documentCategories' })}
            subtitle={formatMessage({ id: 'admin.createEditManage' })}
            icon={'bx-category'}
            path={AdminPaths.CATEGORIES}
          />
        </div>
      </div>
    </main>
  )
}

export default Admin
