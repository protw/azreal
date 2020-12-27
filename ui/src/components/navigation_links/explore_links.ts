import { EuiNavDrawerGroupProps } from '@elastic/eui'

export const buildExploreLinks = (
  makeAction: (path: string) => () => void,
  isManagerAccess: boolean
): EuiNavDrawerGroupProps['listItems'] => [
  {
    label: 'Мій аккаунт',
    onClick: makeAction('/profile'),
    iconType: 'usersRolesApp',
  },
  isManagerAccess && {
    label: 'Користувачі та організації',
    iconType: 'users',
    flyoutMenu: {
      title: 'Користувачі та організації',
      listItems: [
        {
          label: 'Організації',
          onClick: makeAction('/organisations'),
          iconType: 'graphApp'
        },
        {
          label: 'Користувачі',
          onClick: makeAction('/users'),
          iconType: 'usersRolesApp'
        },
        {
          label: 'Додати користувача',
          onClick: makeAction('/users/new'),
          iconType: 'createSingleMetricJob'
        },
        {
          label: 'Створити організацію',
          onClick: makeAction('/organisations/new'),
          iconType: 'packetbeatApp'
        }
      ],
    },
  },
  isManagerAccess
    ? {
      label: 'Датчики',
      onClick: makeAction('/sensors'),
      iconType: 'watchesApp',
      flyoutMenu: {
        title: 'Датчики',
        listItems: [ {
          label: 'Усі датчики',
          onClick: makeAction('/sensors'),
          iconType: 'outlierDetectionJob'
        },
        {
          label: 'Додатий датчик',
          onClick: makeAction('/sensors/new'),
          iconType: 'createAdvancedJob'
        }
        ]
      },
    }
    : {
      label: 'Датчики',
      onClick: makeAction('/sensors'),
      iconType: 'watchesApp'
    },
  {
    label: 'Вимірювання',
    onClick: makeAction('/measurements'),
    iconType: 'visualizeApp',
  },
  {
    label: 'Фактори вимірювань',
    onClick: makeAction('/factors'),
    iconType: 'metricsApp',
  },
  isManagerAccess
    ? {
      label: 'Журнал',
      onClick: makeAction('/service'),
      iconType: 'logsApp',
      flyoutMenu: {
        title: 'Датчики',
        listItems: [
          {
            label: 'Сервісний журнал',
            onClick: makeAction('/service'),
            iconType: 'outlierDetectionJob'
          },
          isManagerAccess && {
            label: 'Новий запис',
            onClick: makeAction('/service/new'),
            iconType: 'createAdvancedJob'
          }
        ]
      }
    }
    : {
      label: 'Журнал',
      onClick: makeAction('/service'),
      iconType: 'logsApp'
    }
].filter(x => !!x)
