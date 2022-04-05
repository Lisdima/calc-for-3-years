<template lang="pug">
.payments-block
    .payments-block__title.title Ежегодные выплаты
    .payments-block__calculation
        .calculation-item.item(v-for="item in time")
            .item-info
                span.item-info__time {{item}}-й год
                span.item-info__bonus.best-bonus(v-if="item === 1") +{{Math.floor((currentSum * 0.28) / currentSum * 100) }}%
                span.item-info__bonus.best-bonus(v-else) +{{Math.floor((item * currentSum * 0.10) / currentSum * 100) }}%
            span.item-money(v-if="item === 1") {{Math.floor(currentSum * 0.28)}} ₽
            span.item-money(v-else) {{Math.floor(item * currentSum * 0.10)}} ₽
        .calculation-item__opacity
    .dividing-line
    .block-deducation
        .deducation-total
            .deducation-total__name Взносы за {{time}} года
            .deducation-total__sum {{(currentSum * time)}} ₽
    .payments-block__issue
      a(href="#popup:myform")
        button.btn.payments-block__btn(:disabled="disabled" :class="{'disabled': disabled}") Оформить

                     
</template>

<script>
import Options from "@/components/AdditionalOptions.vue";

export default {
  props: {
    sum: {
      type: String,
    },
    time: {
      type: Number,
    },
    tooltipPayments: {
      type: Boolean
    },
    tooltipOptions: Boolean,
  },
  components: {
    Options,
  },
  data() {
  },
  computed: {
    disabled() {
      const sum = this.sum.replace(/\D/gi, "");
      if (sum < 100000 || sum > 5000000) {
        return true;
      }
      return false;
    },
    currentSum() {
      return this.sum.replace(/[^\d]/g, "");
    },
  },
};
</script>

<style lang="scss">
.payments-block {
  &__calculation {
    margin-top: 16px;
    display: flex;
    margin-bottom: 29px;
    @media (max-width: 960px) {
      flex-direction: column;
    }
    @media (max-width: 640px) {
      flex-direction: row;
      overflow-x: scroll;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @media (max-width: 480px) {
      padding-right: 30px;
    }
    .calculation-item__opacity {
      display: none;
      @media (max-width: 480px) {
        display: block;
        position: absolute;
        right: 0;
        width: 40px;
        height: 50px;
        border-radius: 3px;
        background: #ffffff;
        opacity: 0.93;
      }
    }
  }
  .item {
    max-width: 98px;
    margin-right: 14px;
    &:last-child {
      margin-right: 0;
    }
  }
  .item-info {
    display: flex;
    align-items: baseline;
    &__time {
      font-size: 14px;
      line-height: 18px;
      font-weight: 300;
      margin-right: 8px;
    }
    &__bonus {
      padding: 2px 6px;
      font-size: 12px;
      background: #8c959e;
      color: #ffffff;
      border-radius: 24px;
      line-height: 14px;
    }
    .best-bonus {
      background: #0db089;
    }
  }
  &__issue {
    .disabled {
      opacity: 0.8;
      &:hover {
        cursor: not-allowed;
      }
    }
  }
}
.block-deducation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
  .deducation-checkbox {
    display: flex;
    @media (max-width: 960px) {
      flex-direction: column;
    }
    @media (max-width: 640px) {
      flex-direction: row;
    }
    @media (max-width: 480px) {
      flex-direction: column;
    }
    &__description {
      display: flex;
      font-weight: 300;
      color: #8c959e;
      font-size: 16px;
      line-height: 22px;
      margin-left: 8px;
      @media (max-width: 960px) {
        margin-left: 36px;
      }
      @media (max-width: 640px) {
        margin-left: 8px;
        font-size: 14px;
        line-height: 18px;
      }
      @media (max-width: 480px) {
        margin-left: 36px;
      }
    }
    .deducation__question {
      position: relative;
      margin-left: 8px;
      color: #28323c;
      .tooltip-active {
        a {
          color: #3E70BB
        }
        @media (max-width: 960px) {
          left: -500%;
        }
        @media (max-width: 640px) {
          left: -300%;
        }
      }
    }
  }
  .deducation-total {
    @media (max-width: 640px) {
      margin-top: 0;
    }
    &__name {
      font-size: 14px;
      line-height: 18px;
      font-weight: 300;
    }
  }
  .block-checkbox__deducation {
    margin-bottom: 0;
  }
}
.deducation-options {
  display: none;
  @media (max-width: 640px) {
    display: block;
    margin-top: 24px;
  }
}
</style>
