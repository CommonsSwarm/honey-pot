import React, { useCallback } from 'react'
import { Button, Field, GU, textStyle, theme, useLayout } from '@1hive/1hive-ui'
import iconFees from '../../../assets/iconFees.svg'
import { getDisputableAppByName } from '../../../utils/app-utils'
import { formatTokenAmount } from '../../../utils/token-utils'
import { useUniswapHnyPrice } from '../../../hooks/useUniswapHNYPrice'
import { useMultiModal } from '../../MultiModal/MultiModalProvider'

function ActionFeesModal({ agreement, onCreateTransaction }) {
  const tokenRate = useUniswapHnyPrice()
  const { next } = useMultiModal()
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small'

  const convictionAppRequirements = getDisputableAppByName(
    agreement.disputableAppsWithRequirements,
    'Conviction Voting'
  )

  const { actionAmount, token } = convictionAppRequirements

  const formatedAmount = formatTokenAmount(actionAmount, token.decimals)
  const dollarAmount = formatTokenAmount(
    actionAmount * tokenRate,
    token.decimals
  )

  const handleOnCreateTransaction = useCallback(() => {
    onCreateTransaction(() => {
      next()
    })
  }, [onCreateTransaction, next])

  return (
    <div>
      <Field
        css={`
          color: ${theme.surfaceContentSecondary};
        `}
      >
        <span
          css={`
            ${compactMode ? textStyle('body3') : textStyle('body2')};
          `}
        >
          A deposit is required for your action to be submitted which will be
          held until the action is finalised. If the action is withdrawn by you
          or completed successfully the deposit will be unlocked, available
          through the collateral manager. If the action is disputed and
          cancelled by Celeste the deposit will be lost.
        </span>
      </Field>

      <div
        css={`
          display: flex;
          width: 100%;
          height: ${4 * GU}px;
          margin-top: ${!compactMode ? 3 * GU : 0}px;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <img src={iconFees} alt="" height={4 * GU} width={4 * GU} />
          <h3
            css={`
              font-weight: 600;
              margin-left: ${GU}px;
            `}
          >
            Action Deposit
          </h3>
        </div>
        <div>
          <span
            css={`
              text-align: left;
              font-weight: 600;
              ${compactMode ? textStyle('body3') : textStyle('body2')};
              margin-right: ${(compactMode ? 1.5 : 3) * GU}px;
            `}
          >
            ${dollarAmount}
          </span>

          <span
            css={`
              font-weight: 600;
              ${compactMode ? textStyle('body3') : textStyle('body2')};
            `}
          >
            {formatedAmount} {token.symbol}
          </span>
        </div>
      </div>
      <Button
        label="Create transaction"
        mode="strong"
        onClick={handleOnCreateTransaction}
        css={`
          margin-top: ${3.125 * GU}px;
          width: 100%;
        `}
      />
    </div>
  )
}

export default ActionFeesModal
